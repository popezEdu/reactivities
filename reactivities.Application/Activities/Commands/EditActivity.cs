using System;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using MediatR;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Activity not found");

            // Map the properties from the request to the existing activity
            // Primer Parameter is the source (request.Activity), second parameter is the destination (activity).
            _mapper.Map(request.Activity, activity);

            // activity.Title = request.Activity.Title;
            // activity.Description = request.Activity.Description;
            // activity.Date = request.Activity.Date;
            // activity.Category = request.Activity.Category;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

