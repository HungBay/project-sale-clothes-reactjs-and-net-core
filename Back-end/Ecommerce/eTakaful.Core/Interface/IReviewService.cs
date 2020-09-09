using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Interface
{
    public interface IReviewService : IServices<Review>
    {
        Task<IEnumerable<Review>> GetReviewByProduct(Guid Id);

    }
}
