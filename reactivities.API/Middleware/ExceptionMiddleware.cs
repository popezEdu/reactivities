using System;
using System.Text.Json;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using reactivities.Application.Core;

namespace reactivities.API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _hostEnvironment;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
        _logger = logger;
    }
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }

        catch (Exception ex)
        {

            await HandleException(context, ex);

            //Console.WriteLine($"An error occurred: {ex.Message}");
            // Here you can log the exception or handle it as needed
            // Log the exception (logging logic not shown here)
            // context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            // await context.Response.WriteAsync("An unexpected error occurred.");
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        _logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = _hostEnvironment.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
            : new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Title = "Validation Error",
            Status = StatusCodes.Status400BadRequest,
            Detail = "One or more validation errors occurred.",
            Type = "ValidationFaiulure"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
