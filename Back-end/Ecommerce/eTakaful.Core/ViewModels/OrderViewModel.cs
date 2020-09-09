using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class OrderViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public int? AccumulatedPoints { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? CreateDate { get; set; } = DateTime.Now;
        public DateTime? ShippingDate { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public DateTime? PaidDate { get; set; }
        public Decimal Amount { get; set; }
        public string Note { get; set; }
        public StatusOrder StatusOrder { get; set; }
        public virtual UserViewModel User { get; set; }
        public virtual ICollection<OrderDetailViewModel> OrderDetails { get; set; }
    }
}
