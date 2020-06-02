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
    public class TestController : ApiController
    {
        [HttpGet]
        public DataTable GetTestPrice()
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                DataTable dt = obj.GetTestPrice();
                return dt;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpPost]
        public void UpdateTest(TestDetails test)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                obj.UpdateTest(test);
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
        }

        [HttpPost]
        public void AddTest(TestDetails test)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                obj.AddTest(test);
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
        }
    }
}
