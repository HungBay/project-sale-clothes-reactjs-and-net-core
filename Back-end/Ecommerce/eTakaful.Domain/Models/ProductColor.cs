using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
        public class ProductColor : BaseModel
    {
        #region ForeignKey
        [ForeignKey("Color")]
        public Guid ColorId { get; set; }
        public virtual Color Color { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        #endregion
    }
}
