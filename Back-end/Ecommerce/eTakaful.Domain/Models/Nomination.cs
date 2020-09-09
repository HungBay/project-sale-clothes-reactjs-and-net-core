using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Domain.Models
{
    [Table("Nomination")]
    public class Nomination : BaseModel
    {
        [Required]
        [ForeignKey("NomineeFK")]
        public Person Nominee { get; set; }

        public Guid NomineeFK { get; set; }

        [Required]
        public string RelationshipType { get; set; }

        [Required]
        public double PayoutPercentage { get; set; }

        [ForeignKey("PolicyFK")]
        public Policy Policy { get; set; }

        public Guid PolicyFK { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int Order { get; set; }
    }
}