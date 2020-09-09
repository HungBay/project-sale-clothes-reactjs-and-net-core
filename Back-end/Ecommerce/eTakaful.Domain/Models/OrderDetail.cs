using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class OrderDetail : BaseModel
    {
        [Required]
        public int Quantity { get; set; }

        public Decimal PriceUnit { get; set; }

        //public Decimal TotalPrice { get; set; }
        public string Color { get; set; }

        public string Size { get; set; }
        #region ForeignKey

        [ForeignKey("Order")]
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        #endregion
    }
}
