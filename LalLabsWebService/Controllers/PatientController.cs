using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LalLabsDataAccessLayer;
using LalLabsDataAccessLayer.Models;

namespace LalLabsWebService.Controllers
{
    public class PatientController : ApiController
    {
        [HttpPost]
        public long SavePatient(LalLabsDataAccessLayer.Models.PatientDetails patient)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                long status = obj.SavePatient(patient);
                return status;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return 0;
        }

        [HttpGet]
        public DataTable PatientGrid(string AddedBy)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                DataTable dt = obj.PatientGrid(AddedBy);
                return dt;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpGet]
        public DataTable GetPatient(string PatientId)
        {
            try
            {
                long patientId = long.Parse(PatientId);
                DataAccessLayer obj = new DataAccessLayer();
                DataTable dt = obj.GetPatient(patientId);
                return dt;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

    }
    
}
