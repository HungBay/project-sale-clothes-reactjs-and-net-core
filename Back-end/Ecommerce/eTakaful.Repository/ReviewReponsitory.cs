using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repository
{
    public class ReviewReponsitory : BaseRepository<Review>, IReviewReponsitory
    {
        public ReviewReponsitory(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Review>> GetReviewByProduct(Guid Id)
        {
            var reviews = await DbContext.Reviews
                .Include(user => user.User)
                .Where(p => p.ProductId == Id)
                .ToListAsync();
            return reviews;
        }

    }
}
