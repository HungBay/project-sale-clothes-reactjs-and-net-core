using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class ProductCategoryViewModel
    {
        public Guid CategoryId { get; set; }
        public virtual CategoryViewModel Category { get; set; }
    }
}
