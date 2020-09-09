using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class ProductDtos
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Decimal UnitPrice { get; set; }

        public int PromotionPrice { get; set; }

        public string Unit { get; set; }

        public int Quantity { get; set; }

        //public IFormFile Image { get; set; }

        ////public IEnumerable<ProductDetailDto> Categories { get; set; }

        ////public IEnumerable<ProductSizeDto> Sizes { get; set; }
        ///
        public IEnumerable<ProductCategoryDto> ProductCategories { get; set; }

        public IEnumerable<ProductSizeDto> ProductSizes { get; set; }

        public IEnumerable<ProductColorDto> ProductColors { get; set; }
    }
}
