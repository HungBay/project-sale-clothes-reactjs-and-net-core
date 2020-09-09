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
    public class RateReponsitory : BaseRepository<Rate>, IRateReponsitory
    {
        public RateReponsitory(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Rate>> GetRatesByProductId(Guid Id)
        {
            var rates = await DbContext.Rates.Where(x => x.ProductId == Id).ToListAsync();
            return rates;
        }
    }
}
