using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using reactivities.Application.Activities.Commands;
using reactivities.Application.Activities.DTOs;

namespace reactivities.Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{

    public CreateActivityValidator() : base(x => x.ActivityDto)
    {

    }

}
