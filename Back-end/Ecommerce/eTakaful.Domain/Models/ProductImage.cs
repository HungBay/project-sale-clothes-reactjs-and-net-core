using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class ProductImage : BaseModel
    {
        [Required]
        [MaxLength(126)]
        public string Name { get; set; }

        public string Url { get; set; }

        public byte[] Image { get; set; }

        public bool ImageMain { get; set; }

        #region ForeignKey

        [ForeignKey("product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        
        #endregion
    }
}
