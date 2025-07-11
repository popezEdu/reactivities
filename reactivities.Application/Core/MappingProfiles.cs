using System;
using AutoMapper;
using reactivities.Domain;

namespace reactivities.Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Define the mapping between Activity and ActivityDto
        CreateMap<Activity, Activity>();
    }

}
