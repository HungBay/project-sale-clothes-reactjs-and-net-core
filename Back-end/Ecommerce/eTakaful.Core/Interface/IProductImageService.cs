using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Interface
{
    public interface IProductImageService : IServices<ProductImage>
    {
        Task<IEnumerable<ProductImage>> GetProductImageByProductId(Guid Id);
    }
}
