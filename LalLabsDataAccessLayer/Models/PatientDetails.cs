using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using LalLabsDataAccessLayer.Models;


namespace LalLabsDataAccessLayer.Models
{
    [AttributeUsage(AttributeTargets.Property,
      Inherited = false,
      AllowMultiple = false)]
    internal sealed class OptionalAttribute : Attribute { }
    public class PatientDetails
    {
        public long PatientId { get; set; }

        public string Title { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Age { get; set; }

        public DateTime DateOfBirth { get; set; }
        
        public string Phone { get; set; }
        
        [Optional]
        public string Address { get; set; }

        [Optional]
        public string Email { get; set; }

        public string DoctorName { get; set; }

        public Boolean Home { get; set; }

        public CollectionDetails HomeCollection = new CollectionDetails();

        public List<TestDetails> Tests = new List<TestDetails>();

        public string Barcode { get; set; }

        public PaymentDetails Payment = new PaymentDetails();
        public string AddedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
