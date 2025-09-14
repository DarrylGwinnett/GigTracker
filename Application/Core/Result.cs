
namespace Application.Core
{        public class Result<T>
        {
            public bool IsSuccess { get; set; }
            public string? Error { get; set; }
            public T? Value { get; set; }
            public int StatusCode { get; set; }
            public string? Type { get; set; }
            public string? Title { get; set; }
            public string? Detail { get; set; }
            public Dictionary<string, string[]>? Errors { get; set; }

            public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };

            public static Result<T> Failure(string error, int statusCode) =>
                new() { IsSuccess = false, Error = error, StatusCode = statusCode };

            public static Result<T> Failure(IEnumerable<string> error, int statusCode) =>
                new() { IsSuccess = false, Error = string.Join("\n", error), StatusCode = statusCode };

            public static Result<T> ValidationFailure(Dictionary<string, string[]> errors, int statusCode = 400) =>
                new()
                {
                    IsSuccess = false,
                    Type = "ValidationFailure",
                    Title = "Validation error",
                    StatusCode = statusCode,
                    Detail = "One or more validation errors has occurred",
                    Errors = errors
                };
        }
    }

