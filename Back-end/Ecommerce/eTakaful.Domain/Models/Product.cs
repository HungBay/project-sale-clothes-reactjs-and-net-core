using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Product : BaseModel
    {
        [Required]
        [MaxLength(256)]
        [MinLength(3)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public Decimal UnitPrice { get; set; }

        public int PromotionPrice { get; set; }

        public string Unit { get; set; }

        public byte[] Image { get; set; }
        
        public int Quantity { get; set; }

        #region ForeignKey

        public virtual ICollection<ProductImage> ProductImages { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual ICollection<ProductCategory> ProductCategories { get; set; }

        public virtual ICollection<ProductSize> ProductSizes { get; set; }

        public virtual ICollection<ProductColor> ProductColors { get; set; }

        public virtual ICollection<Rate> Rates { get; set; }

        #endregion
    }
}
