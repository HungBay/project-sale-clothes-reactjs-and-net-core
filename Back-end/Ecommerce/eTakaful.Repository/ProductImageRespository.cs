using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Repository
{
    public class ProductImageRespository : BaseRepository<ProductImage>, IProductImage
    {
        public ProductImageRespository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<ProductImage>> GetProductImageByProductId(Guid Id)
        {
            var images = await DbContext.ProductImages.Where(productId => productId.ProductId == Id).ToListAsync();
            return images;
        }
    }
}
