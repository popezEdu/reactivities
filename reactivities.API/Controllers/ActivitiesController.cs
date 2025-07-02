using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.API.Controllers;

public class ActivitiesController : BaseApiController
{

    private readonly AppDbContext _context;

    public ActivitiesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        var activities = await _context.Activities.ToListAsync();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null)
        {
            return NotFound();
        }
        return Ok(activity);
    }
}
