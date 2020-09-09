using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;

namespace Ecommerce.Service.Services
{
    public class ProductService : EcommerceServices<Product>, IProductSevice
    {
        private readonly IProductRepository _productReponsitory;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productReponsitory, IMapper mapper) : base(productReponsitory)
        {
            _productReponsitory = productReponsitory;
            _mapper = mapper;
        }

        public IEnumerable<ProductViewModel> GetAllProducts()
        {
            var getAllProducts = _productReponsitory.GetAllProducts().Select(m => new ProductViewModel
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Image = m.Image,
                UnitPrice = m.UnitPrice,
                Unit = m.Unit,
                categories = m.ProductCategories.Select(x => x.Category.Name),
                sizes = m.ProductSizes.Select(x => x.Size.Name),
                status = m.Status
            });
            return getAllProducts;
        }

        public IEnumerable<ProductViewModel> GetAllProductByAdmin()
        {
            var getAllProducts = _productReponsitory.GetAllProductByAdmin().Select(m => new ProductViewModel
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Image = m.Image,
                UnitPrice = m.UnitPrice,
                Unit = m.Unit,
                categories = m.ProductCategories.Select(x => x.Category.Name),
                sizes = m.ProductSizes.Select(x => x.Size.Name),
                status = m.Status
            });
            return getAllProducts;
        }

        public ProductViewModel GetProductCategoriesSizes(Guid Id)
        {
            
            var product = _productReponsitory.GetProductCategoriesSizes(Id);
            ProductViewModel productVM = new ProductViewModel {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Image = product.Image,
                UnitPrice = product.UnitPrice,
                Unit = product.Unit,
                categories = product.ProductCategories.Select(x => x.Category.Name),
                sizes = product.ProductSizes.Select(s => s.Size.Name)
            };
            return productVM;
        }

        public async Task<Product> GetProductCategoriesSizesRatesCommentsImages(Guid Id)
        {
            var product = _productReponsitory.GetProductCategoriesSizesRatesCommentsImages(Id);
            return await product;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategory(Guid Id)
        {
            var products = _productReponsitory.GetProductsByCategory(Id);
            return await products;
        }

        public async Task<IEnumerable<object>> GetProductByMax()
        {
            return await _productReponsitory.GetProductByMax();
        }

        public async Task<IEnumerable<object>> GetProductByMin()
        {
            return await _productReponsitory.GetProductByMin();
        }

        public async Task<IEnumerable<Product>> GetProductNew()
        {
            return await _productReponsitory.GetProductNew();
        }

        public async Task<IEnumerable<Product>> GetProductCategory(Guid Id)
        {
            return await _productReponsitory.GetProductCategory(Id);
        }

        public async Task<IEnumerable<object>> GetNavigation()
        {
            return await _productReponsitory.GetNavigation();
        }

        public async Task<IEnumerable<Product>> GetProductMultipleCategory(List<Guid> Id)
        {
            return await _productReponsitory.GetProductMultipleCategory(Id);
        }

        public async Task<IEnumerable<Product>> FindProductByName(string name)
        {
            return await _productReponsitory.FindProductByName(name);
        }
    }
}
