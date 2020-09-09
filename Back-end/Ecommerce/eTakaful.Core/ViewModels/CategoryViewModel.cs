using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class CategoryViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //public Status Status { get; set; }
        public string Description { get; set; }
    }
}
