using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Domain.Models;
using Ecommerce.Service.ViewModels;

namespace Ecommerce.Service.Interface
{
    public  interface IProductSevice : IServices<Product>
    {
        IEnumerable<ProductViewModel> GetAllProducts();
        IEnumerable<ProductViewModel> GetAllProductByAdmin();
        ProductViewModel GetProductCategoriesSizes(Guid Id);
        Task<Product> GetProductCategoriesSizesRatesCommentsImages(Guid Id);
        Task<IEnumerable<Product>> GetProductsByCategory(Guid Id);
        Task<IEnumerable<Product>> GetProductNew();
        Task<IEnumerable<Product>> GetProductCategory(Guid Id);
        Task<IEnumerable<object>> GetProductByMax();
        Task<IEnumerable<object>> GetProductByMin();

        Task<IEnumerable<object>> GetNavigation();
        Task<IEnumerable<Product>> GetProductMultipleCategory(List<Guid> Id);
        Task<IEnumerable<Product>> FindProductByName(string name);
    }
}
