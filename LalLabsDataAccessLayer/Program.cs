using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using LalLabsDataAccessLayer.Models;

namespace LalLabsDataAccessLayer
{
	class Program
	{

        static void Main(string[] args)
        {
            //Console.Write(DateTime.Now);
            //TestConnection();
            //LoginValidation("vivek", "Vivek@1989");
            /*PatientDetails patient = new PatientDetails();
            patient.PatientId = 2;
            patient.Title = "Mr.";
            patient.FirstName = "Shubham";
            patient.LastName = "Tiwari";
            patient.DateOfBirth = DateTime.Today;
            patient.Age = "22Years 05Months 21Days";
            patient.Phone = "9808842052";
            patient.DoctorName = "Sanjeev Kumar";
            patient.Home = false;
            patient.Tests.Malaria = true;
            patient.Tests.Typhoid = false;
            patient.Barcode = "a123bc";
            patient.Payment.PaymentMode = "cash";
            patient.Payment.TotalAmount = 100;
            patient.Payment.Discount = 10;
            patient.Payment.DiscountAmount = 10;
            patient.Payment.NetAmount = 90;
            patient.Payment.PaidAmount = 50;
            patient.Payment.BalanceAmount = 40;
            patient.AddedBy = "vivek";
            patient.CreatedOn = DateTime.Today;
            patient.ModifiedOn = DateTime.Today;
            long PatientId = UpdatePatient(patient);
            Console.WriteLine(PatientId);
            */

            //PatientGrid("vivek");

            //GetUserRole("vivek", "Vivek@1989");

            // GetPatient(9);

            GetPatientByPhone("9045626155");
        }

        public void TestConnection()
        {
            DataAccessLayer obj = new DataAccessLayer();
            bool status = obj.TestConnection();
            Console.WriteLine(status);
        }

        public static void LoginValidation(string UserName, string UserPassword)
        {
            DataAccessLayer obj = new DataAccessLayer();
            bool status = obj.LoginValidation(UserName, UserPassword);
            Console.WriteLine(status);
        }

        public static long SavePatient(PatientDetails patient)
        {
            DataAccessLayer obj = new DataAccessLayer();
            long status = obj.SavePatient(patient);
            return status;
        }

        public static PatientDetails GetPatient(long PatientId)
        {
            DataAccessLayer obj = new DataAccessLayer();
            PatientDetails Patient = obj.GetPatient(PatientId);
            return Patient;
        }

        public static PatientDetails[] PatientGrid()
        {
            DataAccessLayer obj = new DataAccessLayer();
            PatientDetails[] patients = obj.PatientGrid();
            return patients;
        }

        public static void GetUserRole(string UserName, string UserPassword)
        {
            DataAccessLayer obj = new DataAccessLayer();
            string UserRole = obj.GetUserRole(UserName, UserPassword);
            Console.WriteLine(UserRole);
        }

        public static long UpdatePatient(PatientDetails patient)
        {
            DataAccessLayer obj = new DataAccessLayer();
            long status = obj.UpdatePatient(patient);
            return status;
        }

        public static PatientDetails[] GetPatientByPhone(string phone)
        {
            DataAccessLayer obj = new DataAccessLayer();
            PatientDetails[] patients = obj.GetPatientByPhone(phone);
            return patients;
        }
    }

}
