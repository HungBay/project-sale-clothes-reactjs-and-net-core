using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repository.Interfaces
{
    public class ProductRespository : BaseRepository<Product>, IProductRepository

    {
        public ProductRespository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<Product> GetAllProductByAdmin() =>
            DbContext.Products
                .Include(pd => pd.ProductCategories).ThenInclude(c => c.Category)
                .Include(s => s.ProductSizes).ThenInclude(y => y.Size);

        public IEnumerable<Product> GetAllProducts() => 
            DbContext.Products.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                .Include(pd => pd.ProductCategories).ThenInclude(c => c.Category)
                .Include(s => s.ProductSizes).ThenInclude(y => y.Size)
                .Include(r => r.Rates)
            ;

        public async Task<IEnumerable<Product>> GetProductsByCategory(Guid Id)
        {
            var products =
                DbContext.Products.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                .Include(pd => pd.ProductCategories).ThenInclude(c => c.Category)
                .Include(s => s.ProductSizes).ThenInclude(y => y.Size)
                .Where(pc => pc.ProductCategories.Any(g => g.CategoryId == Id))
                .ToListAsync();
            return await products;
        }


        public Product GetProductCategoriesSizes(Guid Id)
        {
            var product = DbContext.Products
                .Include(pd => pd.ProductCategories).ThenInclude(c => c.Category)
                .Include(s => s.ProductSizes).ThenInclude(y => y.Size).Where(x => x.Id == Id).FirstOrDefault();
            return product;
        }

        public async Task<Product> GetProductCategoriesSizesRatesCommentsImages(Guid Id)
        {
            var product = DbContext.Products
                .Include(pd => pd.ProductCategories).ThenInclude(c => c.Category)
                .Include(ps => ps.ProductSizes).ThenInclude(s => s.Size)
                .Include(pc => pc.ProductColors).ThenInclude(cc => cc.Color)
                .Include(pi => pi.ProductImages)
                .Include(rv => rv.Reviews)
                .Include(r => r.Rates)
                .Where(x => x.Id == Id).FirstOrDefaultAsync();

            return await product;
                
        }

        public async Task<IEnumerable<object>> GetProductByMax()
        {
            var products = await DbContext.OrderDetails
                .GroupBy(date => new { date.ProductId, date.Order.OrderDate.Month, date.Product.Name,date.Product.Description, date.Product.UnitPrice, date.Product.PromotionPrice, date.Product.Image })
                .Where(x => x.Key.Month == DateTime.Now.Month)
                .Select(x => new {
                    count = x.Count(),
                    ProductId = x.Key.ProductId,
                    name = x.Key.Name,
                    unitPrice = x.Key.UnitPrice,
                    promotionPrice = x.Key.PromotionPrice,
                    description = x.Key.Description,
                    image = x.Key.Image,
                }).OrderByDescending(x => x.count).Take(5).ToListAsync();

            if(products.Count() == 0)
            {
                var productMax = await DbContext.OrderDetails
                .GroupBy(date => new { date.ProductId, date.Order.OrderDate.Month, date.Product.Name, date.Product.Description, date.Product.UnitPrice, date.Product.PromotionPrice, date.Product.Image })
                .Where(x => x.Key.Month == 6)
                .Select(x => new {
                    count = x.Count(),
                    ProductId = x.Key.ProductId,
                    name = x.Key.Name,
                    unitPrice = x.Key.UnitPrice,
                    promotionPrice = x.Key.PromotionPrice,
                    description = x.Key.Description,
                    image = x.Key.Image,
                }).OrderByDescending(x => x.count).Take(5).ToListAsync();
                return productMax;
            }
            return products;
        }

        public async Task<IEnumerable<object>> GetProductByMin()
        { 
            var products = await DbContext.OrderDetails
                .GroupBy(date => new { date.ProductId, date.Order.OrderDate.Month, date.Product.Name, date.Product.UnitPrice, date.Product.PromotionPrice, date.Product.Image })
                .Where(x => x.Key.Month == DateTime.Now.Month)
                .Select(x => new {
                    count = x.Count(),
                    productId = x.Key.ProductId,
                    name= x.Key.Name,
                    unitPrice = x.Key.UnitPrice,
                    promotionPrice = x.Key.PromotionPrice,
                    image = x.Key.Image,
                }).OrderBy(x => x.count).ToListAsync();

            return products;
        }

        public async Task<IEnumerable<Product>> GetProductNew()
        {
            var product = await DbContext.Products.OrderByDescending(date => date.CreatedBy).Take(10).ToListAsync();
            return product;
        }

        public async Task<IEnumerable<Product>> GetProductCategory(Guid Id)
        {
            var products =
                DbContext.Products.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                .Where(pc => pc.ProductCategories.Any(g => g.CategoryId == Id))
                .Take(5)
                .ToListAsync();
            return await products;
        }

        public async Task<IEnumerable<object>> GetNavigation()
        {
            var navigation = await DbContext.Categories.GroupBy(slug => slug.Url)
                .Select(x => new
                {
                    slug = x.Key,
                    name = x.Where(y => y.Url == x.Key).Select(item => new
                    {
                        id = item.Id,
                        name = item.Name,
                        slug = x.Key
                    })
                }).ToListAsync();
            return navigation;
        }

        public async Task<IEnumerable<Product>> GetProductMultipleCategory(List<Guid> lstId)
        {
            
            var products = await
                DbContext.Products.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                .Where(pc => pc.ProductCategories.Any(g => lstId.Contains(g.CategoryId)))
                .ToListAsync();
            return products;
        }

        public async Task<IEnumerable<Product>> FindProductByName(string name)
        {
            var searchTextArray = name.ToLower().Split(' ');
            var products = await DbContext.Products.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                //.Where(c => c.Name != null && c.Name.ToLower().Contains("%"+ name.ToLower()) + "%").ToListAsync();
                .Where(q => searchTextArray.Any(s => q.Name.ToLower().Contains(s))).ToListAsync();
            return products;
        }
    }
}
