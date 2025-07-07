using System;
using MediatR;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
               .FindAsync([request.Id], cancellationToken) ?? throw new Exception("Activity not found");

            _context.Activities.Remove(activity);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }

}
