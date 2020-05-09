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
            patient.Title = "Mr";
            patient.FirstName = "Aditya";
            patient.MiddleName = "";
            patient.LastName = "Dubey";
            patient.DateOfBirth = DateTime.Parse("Mon Sep 29 1997 00:00:00");
            patient.Age = 24;
            patient.Phone = 9045626155;
            patient.Address = "";
            patient.DoctorName = "Sanjeev Kumar";
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
            patient.CreatedOn = DateTime.Parse("Mon Sep 01 1997 00:00:00");
            patient.ModifiedOn = DateTime.Parse("Wed Sep 10 1997 00:00:00");
            long PatientId = SavePatient(patient);
            Console.WriteLine(PatientId);
            */

            //PatientGrid("vivek");

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
    }

}
