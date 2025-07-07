using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Queries;

public class GetActivityList
{
    // Query class to represent the request for getting a list of activities.
    // El query basicamente debe definir lo que se quiere obtener.    
    public class Query : IRequest<List<Activity>> { }

    // Handler for the GetActivityList query
    // This class will implement the IRequestHandler interface from MediatR 
    // and will handle the logic to retrieve the list of activities.
    // El primer parameter is the type of the request (Query) and the second parameter is the type of the response (List<Activity>).
    public class Handler : IRequestHandler<Query, List<Activity>>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities
                .ToListAsync(cancellationToken);
        }
    }

}
