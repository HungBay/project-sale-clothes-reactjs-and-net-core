using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Core.ViewModels
{
    public class PersonViewModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime Birthdate { get; set; }

        [Required]
        public string Sex { get; set; }

        public string Weight { get; set; }

        public string Height { get; set; }

        [Required]
        public string IdentificationNo { get; set; }

        [Required]
        public string IdentificationType { get; set; }

        public string Occupation { get; set; }

        [Required]
        public string PrimaryPhoneNo { get; set; }

        public string AdditionalPhoneNo { get; set; }

        public string Address { get; set; }

        public string MaritalStatus { get; set; }

        public int NumberOfChildren { get; set; }

        public string PreExistingConditions { get; set; }

        public bool HadMajorSurgery { get; set; }
    }
}