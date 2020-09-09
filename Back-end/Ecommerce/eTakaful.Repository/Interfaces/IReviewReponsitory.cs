using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repository.Interfaces
{
    public interface IReviewReponsitory : IRepository<Review>
    {
         Task<IEnumerable<Review>> GetReviewByProduct(Guid Id);
    }
}
