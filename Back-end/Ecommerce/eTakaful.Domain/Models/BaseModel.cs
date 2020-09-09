using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ecommerce.Domain.Enums;

namespace Ecommerce.Domain.Models
{
    public class BaseModel
    {
        public BaseModel()
        {
            Id = Guid.NewGuid();            
        }

        [Key]
        public Guid Id { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
       
        public string CreatedBy { get; set; }
       
        public DateTime? UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;

        public Status Status { get; set; } = Status.Active;
    }

   
}