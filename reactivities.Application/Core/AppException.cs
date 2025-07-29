using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactivities.Application.Core;

public class AppException
{

    public AppException(int code, string message, string? details)
    {
        Message = message;
        Code = code;
        Details = details;
    }

    public string Message { get; }
    public int Code { get; }
    public string? Details { get; }

}
