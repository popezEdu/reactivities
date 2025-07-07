using System;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        // var activity = await _context.Activities.FindAsync(id);
        // if (activity == null)
        // {
        //     return NotFound();
        // }
        // return Ok(activity);

        // return await _mediator.Send(
        //     new reactivities.Application.Activities.Queries.GetActivityDetails.Query { Id = id });

        return await Mediator.Send(
            new reactivities.Application.Activities.Queries.GetActivityDetails.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivity(reactivities.Domain.Activity activity)
    {
        // _context.Activities.Add(activity);
        // await _context.SaveChangesAsync();
        // return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);

        // Using MediatR to handle the command for creating a new activity
        return await Mediator.Send(
            new reactivities.Application.Activities.Commands.CreateActivity.Command { Activity = activity }
        );
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(reactivities.Domain.Activity activity)
    {
        // Using MediatR to handle the command for editing an existing activity
        await Mediator.Send(new reactivities.Application.Activities.Commands.EditActivity.Command { Activity = activity });

        // Devuelve este valor: 204No Content
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        try
        {
            // Using MediatR to handle the command for deleting an activity
            await Mediator.Send(new reactivities.Application.Activities.Commands.DeleteActivity.Command { Id = id });

            // Devuelve este valor: 204No Content
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
