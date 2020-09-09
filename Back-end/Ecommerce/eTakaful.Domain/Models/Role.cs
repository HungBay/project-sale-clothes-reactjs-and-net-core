using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Role : BaseModel
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        #region fk
        public virtual ICollection<User> Users { get; set; }
        #endregion
    }
}
