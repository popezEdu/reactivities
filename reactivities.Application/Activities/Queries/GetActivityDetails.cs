using System;
using MediatR;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Queries;

public class GetActivityDetails
{

    public class Query : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Activity>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .FindAsync([request.Id], cancellationToken);

            return activity ?? throw new Exception("Activity not found");
        }
    }

}
