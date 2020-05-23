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

            //TestConnection();
            //LoginValidation("vivek", "Vivek@1989");
            /*PatientDetails patient = new PatientDetails();
            patient.Title = "Mr.";
            patient.FirstName = "Aditya";
            patient.LastName = "Tiwari";
            patient.DateOfBirth = DateTime.Today;
            patient.Age = "22Years 05Months 21Days";
            patient.Phone = "9808842052";
            patient.DoctorName = "Sanjeev Kumar";
            patient.Tests.Malaria = true;
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
            long PatientId = SavePatient(patient);
            Console.WriteLine(PatientId);*/


            //PatientGrid("vivek");

            GetUserRole("vivek", "Vivek@1989");
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

        public static DataTable PatientGrid(string AddedBy)
        {
            DataAccessLayer obj = new DataAccessLayer();
            DataTable dt = new DataTable();
            dt = obj.PatientGrid(AddedBy);
            return dt;
        }

        public static void GetUserRole(string UserName, string UserPassword)
        {
            DataAccessLayer obj = new DataAccessLayer();
            string UserRole = obj.GetUserRole(UserName, UserPassword);
            Console.WriteLine(UserRole);
        }
    }

}
