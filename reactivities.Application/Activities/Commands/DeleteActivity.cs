using System;
using MediatR;
using reactivities.Application.Core;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
               .FindAsync([request.Id], cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            _context.Activities.Remove(activity);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem deleting activity");

            return Result<Unit>.Success(Unit.Value);
        }
    }

}
