using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Interface
{
    public interface IRateService : IServices<Rate>
    {
        Task<IEnumerable<Rate>> GetRatesByProductId(Guid Id);
    }
}
