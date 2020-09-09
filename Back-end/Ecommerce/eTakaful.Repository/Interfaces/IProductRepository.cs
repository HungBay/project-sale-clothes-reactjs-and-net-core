using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repository.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        //Task<ICollection<Product>> GetAllProductSizeCategory();
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetAllProductByAdmin();
        Product GetProductCategoriesSizes(Guid Id);
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
