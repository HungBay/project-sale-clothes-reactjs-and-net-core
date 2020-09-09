using System.Collections.Generic;
using System.Linq;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Ecommerce.Portal.Infrastructure.Extensions
{
    public static class ModelStateExtension
    {
        public static IEnumerable<ValidationError> AllErrors(this ModelStateDictionary modelState)
        {
            return modelState.Keys.SelectMany(key => modelState[key].Errors.Select(x => new ValidationError(key, x.ErrorMessage))).ToList();
        }
    }

}
