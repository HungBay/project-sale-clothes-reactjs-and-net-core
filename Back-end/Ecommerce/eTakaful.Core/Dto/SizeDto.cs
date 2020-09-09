using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class SizeDto
    {
        [Required(ErrorMessage = "field is required")]
        public string Name { get; set; }
    }
}

