using Ecommerce.Domain.Models;
using Ecommerce.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Interface
{
    public interface IProductService : IServices<Product>
    {
        Task<List<ProductViewModel>> GetProductByCategoryIdAndOrderByView(Guid categoryId);
        Task<bool> GrowUpViewByProductId(Guid productId);
    }
}
