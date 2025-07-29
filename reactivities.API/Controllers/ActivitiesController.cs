using System;
using System.Reflection.Metadata.Ecma335;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactivities.Application.Activities.DTOs;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.API.Controllers;

public class ActivitiesController : BaseApiController
{

    //private readonly IMediator _mediator;

    public ActivitiesController()
    {
        //_mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // var activities = await _context.Activities.ToListAsync();
        // return Ok(activities);

        // Using MediatR to handle the query for getting the list of activities
        return await Mediator.Send(new reactivities.Application.Activities.Queries.GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(
            new reactivities.Application.Activities.Queries.GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivity(CreateActivityDto activityDto)
    {
        // _context.Activities.Add(activity);
        // await _context.SaveChangesAsync();
        // return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);

        // Using MediatR to handle the command for creating a new activity
        return HandleResult(await Mediator.Send(
            new reactivities.Application.Activities.Commands.CreateActivity.Command { ActivityDto = activityDto })
        );
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        // Using MediatR to handle the command for editing an existing activity
        return HandleResult(await Mediator.Send(new reactivities.Application.Activities.Commands.EditActivity.Command { ActivityDto = activity }));

        // Antes
        // Devuelve este valor: 204 No Content
        // El código de estado HTTP 204, "Sin contenido", se utiliza en API RESTful cuando una solicitud ha sido procesada exitosamente por el servidor, pero no hay contenido que devolver en el cuerpo de la respuesta
        // return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new reactivities.Application.Activities.Commands.DeleteActivity.Command { Id = id }));

        // try
        // {
        //     // Using MediatR to handle the command for deleting an activity
        //     await Mediator.Send(new reactivities.Application.Activities.Commands.DeleteActivity.Command { Id = id });

        //     // Devuelve este valor: 204No Content
        //     return Ok();
        // }
        // catch (Exception ex)
        // {
        //     return BadRequest(ex.Message);
        // }

    }
}
