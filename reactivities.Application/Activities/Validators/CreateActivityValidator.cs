using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using reactivities.Application.Activities.Commands;

namespace reactivities.Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{

    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(100)
            .WithMessage("Title must not exceed 100 characters.");

        RuleFor(x => x.ActivityDto.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");

        RuleFor(x => x.ActivityDto.Date)
            .NotEmpty()
            .WithMessage("Date is required.")
            .GreaterThan(DateTime.Now)
            .WithMessage("Date must be in the future.");

        RuleFor(x => x.ActivityDto.Category)
            .NotEmpty()
            .WithMessage("Category is required.");
    }

}
