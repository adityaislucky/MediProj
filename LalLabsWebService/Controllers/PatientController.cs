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
        public PatientDetails[] PatientGrid()
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                PatientDetails[] Patients = obj.PatientGrid();
                return Patients;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpGet]
        public PatientDetails GetPatient(string PatientId)
        {
            try
            {
                long patientId = long.Parse(PatientId);
                DataAccessLayer obj = new DataAccessLayer();
                PatientDetails Patient = obj.GetPatient(patientId);
                return Patient;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpPost]
        public long UpdatePatient(LalLabsDataAccessLayer.Models.PatientDetails patient)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                long status = obj.UpdatePatient(patient);
                return status;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return 0;
        }
    }
    
}
