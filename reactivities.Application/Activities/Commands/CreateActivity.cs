using System;
using MediatR;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class CreateActivity
{
    // Command class to represent the request for creating a new activity.
    // Retorna el Id de la actividad creada.
    public class Command : IRequest<Guid>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command, Guid>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Activities.Add(request.Activity);
            await _context.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
}
