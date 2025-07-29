using System;
using FluentValidation;
using reactivities.Application.Activities.Commands;
using reactivities.Application.Activities.DTOs;

namespace reactivities.Application.Activities.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{

    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id)
        .NotEmpty()
        .WithMessage("Id requerido.");
    }

}

