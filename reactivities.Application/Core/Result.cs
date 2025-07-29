using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactivities.Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; private set; }

    public T? Value { get; private set; }

    public string? Error { get; private set; }

    public int Code { get; private set; }

    public static Result<T> Success(T value)
    {
        return new Result<T>
        {
            IsSuccess = true,
            Value = value

        };
    }

    public static Result<T> Failure(string error, int code = 400)
    {
        return new Result<T>
        {
            IsSuccess = false,
            Error = error,
            Code = code
        };
    }

}
