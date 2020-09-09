using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class OrderPassDto
    {

        public OrderDto OrderDto { get; set; }
        public List<OrderDetailDto> OrderDetailDtos { get; set; }
    }
}
