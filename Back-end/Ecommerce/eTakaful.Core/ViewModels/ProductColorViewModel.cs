using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class ProductColorViewModel
    {
        public Guid ColorId { get; set; }
        public virtual ColorViewModel Color {get;set;}
    }
}
