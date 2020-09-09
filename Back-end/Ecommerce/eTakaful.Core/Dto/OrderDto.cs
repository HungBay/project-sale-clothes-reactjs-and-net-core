using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Note { get; set; }
        public Decimal Amount { get; set; }
        public int? AccumulatedPoints { get; set; }
        public Guid UserId { get; set; }
        public Guid? EmployeeId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public DateTime? PaidDate { get; set; }
        public StatusOrder StatusOrder { get; set; }
    }
}
