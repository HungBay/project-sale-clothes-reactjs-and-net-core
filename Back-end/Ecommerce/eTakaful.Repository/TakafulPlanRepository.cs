using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Repository
{
    public class TakafulPlanRepository : BaseRepository<TakafulPlan>
    {
        public TakafulPlanRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}