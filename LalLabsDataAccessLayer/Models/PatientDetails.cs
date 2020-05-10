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

    public class PatientDetails
    {
        public long PatientId { get; set; }

        public string Title { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public Int32 Age { get; set; }

        public DateTime DateOfBirth { get; set; }
        
        public long Phone { get; set; }
        
        public string Address { get; set; }
        
        public string DoctorName { get; set; }

        public TestDetails Tests = new TestDetails();

        public string Barcode { get; set; }

        public PaymentDetails Payment = new PaymentDetails();
        public string AddedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime ModifiedOn { get; set; }
    }
}
