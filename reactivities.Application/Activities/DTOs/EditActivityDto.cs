using System;

namespace reactivities.Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{

    public Guid Id { get; set; } = Guid.Empty;

}
