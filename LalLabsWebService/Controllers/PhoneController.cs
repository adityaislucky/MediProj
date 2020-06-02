using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LalLabsDataAccessLayer;
using LalLabsDataAccessLayer.Models;

namespace LalLabsWebService.Controllers
{
    public class PhoneController : ApiController
    {
        [HttpGet]
        public string[] GetAllPhones()
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                DataTable dt = obj.GetAllPhones();
                List<string> phoneList= new List<string>();
                foreach (DataRow dr in dt.Rows)
                {
                    string phone = dr["Phone"].ToString();
                    phoneList.Add(phone);
                }
                string[] phoneArray = phoneList.ToArray();
                return phoneArray;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpGet]
        public PatientDetails[] GetPatientByPhone(string phone)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                PatientDetails[] patients = obj.GetPatientByPhone(phone);
                return patients;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }
    }
}
