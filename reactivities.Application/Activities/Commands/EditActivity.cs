using System;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using MediatR;
using reactivities.Application.Activities.DTOs;
using reactivities.Application.Core;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .FindAsync([request.ActivityDto.Id], cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);


            // Map the properties from the request to the existing activity
            // Primer Parameter is the source (request.Activity), second parameter is the destination (activity).
            _mapper.Map(request.ActivityDto, activity);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Hubo un problema al editar la actividad.");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}

