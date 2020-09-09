using Microsoft.AspNetCore.Builder;

namespace Ecommerce.Portal.Infrastructure.Extensions
{
    public static class ApiResponseMiddlewareExtension
    {
        public static IApplicationBuilder UseApiResponseAndExceptionWrapper(this IApplicationBuilder builder, ApiResponseOptions options = default)
        {
            options = new ApiResponseOptions();
            return builder.UseMiddleware<ApiResponseMiddleware>(options);
        }
    }
}
