using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Core.ViewModels
{
    public class NominationViewModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public PersonViewModel Nominee { get; set; }

        [Required]
        public string RelationshipType { get; set; }

        [Required]
        public double PayoutPercentage { get; set; }

        public string Status { get; set; }

        public int Order { get; set; }
    }
}