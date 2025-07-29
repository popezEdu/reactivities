using System;
using AutoMapper;
using FluentValidation;
using MediatR;
using reactivities.Application.Activities.DTOs;
using reactivities.Application.Core;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities.Commands;

public class CreateActivity
{
    // Command class to represent the request for creating a new activity.
    // Retorna el Id de la actividad creada.
    public class Command : IRequest<Result<Guid>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Guid>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = _mapper.Map<Activity>(request.ActivityDto);
            _context.Activities.Add(activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Guid>.Failure("Hubo un problema al crear la actividad.");

            return Result<Guid>.Success(activity.Id);
        }
    }
}
