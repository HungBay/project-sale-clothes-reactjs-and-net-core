using Ecommerce.Domain.Enums;
using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class ProductViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Decimal UnitPrice { get; set; }

        public Decimal PromotionPrice { get; set; }

        public string Unit { get; set; }

        public byte[] Image { get; set; }

        public int Quantity { get; set; }
        public Status status { get; set; }

        public IEnumerable<string> categories { get; set; }

        public IEnumerable<string> sizes { get; set; }

        public virtual ICollection<ProductImageViewModel> ProductImages { get; set; }

        public virtual ICollection<ReviewViewModel> Reviews { get; set; }

        public virtual ICollection<ProductCategoryViewModel> ProductCategories { get; set; }

        public virtual ICollection<ProductSizeViewModel> ProductSizes { get; set; }

        public virtual ICollection<ProductColorViewModel> ProductColors { get; set; }

        public virtual ICollection<RateViewModel> Rates { get; set; }
    }
}
