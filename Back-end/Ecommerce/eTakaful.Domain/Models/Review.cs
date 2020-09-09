using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Review : BaseModel
    {
        [Required]
        [Column("Comment")]
        public string Comment { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public byte[] Image { get; set; }

        #region ForeignKey

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        #endregion
    }
}
