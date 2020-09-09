using Ecommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Order : BaseModel
    {
    
        public string Name { get; set; }

     
        public string Address { get; set; }

        public string Phone { get; set; }

        public Decimal Amount { get; set; }
        public int? AccumulatedPoints { get; set; }
        [Required]
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime? CreateDate { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public DateTime? PaidDate { get; set; }
        [MaxLength(200)]
        public string Note { get; set; }

        public StatusOrder StatusOrder { get; set; } = StatusOrder.CREATE;
        #region ForeignKey

        [ForeignKey("User")]
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }

        public Guid? EmployeeId { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        #endregion
    }
    public enum StatusOrder
    {
        CREATE = 0,
        SHIPPING = 1,
        DELIVERED = 2,
        PAID = 3,
    }
}
