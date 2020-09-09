using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class ProductSize : BaseModel
    {
        #region ForeignKey
        [ForeignKey("Size")]
        public Guid SizeId { get; set; }
        public virtual Size Size { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        #endregion
    }
}
