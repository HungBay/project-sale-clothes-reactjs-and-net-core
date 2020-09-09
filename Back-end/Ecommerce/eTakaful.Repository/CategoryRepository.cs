using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;

namespace Ecommerce.Repository
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryReponsitory
    {
        public CategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public virtual async Task<ICollection<Category>> GetCategoryParrent()
        {
            var category = await Task.FromResult<ICollection<Category>>(DbContext.Set<Category>().Where(c => (int)c.Status == 1).ToList());
            return category;
        }
    }
}
