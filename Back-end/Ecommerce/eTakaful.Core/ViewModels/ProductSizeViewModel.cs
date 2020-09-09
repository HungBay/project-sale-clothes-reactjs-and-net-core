using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class ProductSizeViewModel
    {
        public Guid SizeId { get; set; }
        public virtual SizeViewModel Size { get; set; }
    }
}
