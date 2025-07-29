using System;
using MediatR;
using reactivities.Application.Core;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Queries;

public class GetActivityDetails
{

    public class Query : IRequest<Result<Activity>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Activity>>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .FindAsync([request.Id], cancellationToken);

            if (activity == null)
            {
                return Result<Activity>.Failure("Activity not found", 404);
            }

            return Result<Activity>.Success(activity);
        }
    }

}
