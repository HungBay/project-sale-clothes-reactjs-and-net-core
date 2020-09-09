using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Color : BaseModel
    {
        [Required]
        public string Name { get; set; }

        #region ForeignKey

        public virtual ICollection<ProductColor> ProductColors { get; set; }

        #endregion
    }
}
