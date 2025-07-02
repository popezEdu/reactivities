using System;
using Microsoft.EntityFrameworkCore;
using reactivities.Domain;

namespace reactivities.Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }
}
