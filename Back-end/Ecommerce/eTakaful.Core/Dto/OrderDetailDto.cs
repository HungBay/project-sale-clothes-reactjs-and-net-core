using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class OrderDetailDto
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
        public Decimal PriceUnit { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
    }
}
