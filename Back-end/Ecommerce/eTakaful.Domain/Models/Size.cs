using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Size : BaseModel
    {
        [Required]
        public string Name { get; set; }

        #region ForeignKey

        public virtual ICollection<ProductSize> ProductSizes { get; set; }

        #endregion
    }
}
