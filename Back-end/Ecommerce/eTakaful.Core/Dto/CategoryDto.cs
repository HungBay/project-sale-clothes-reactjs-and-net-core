using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage ="Field is required")]
        public string Name { get; set; }
        [StringLength(50, ErrorMessage ="Max length is 50 char")]
        public string Description { get; set; }
        public string Url { get; set; }
    }
}
