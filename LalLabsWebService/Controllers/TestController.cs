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
        public TestDetails[] GetTestPrice()
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                return obj.GetTestPrice();
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }

        [HttpPost]
        public Int32 UpdateTest(TestDetails test)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                return (obj.UpdateTest(test));
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            return 0;
        }

        [HttpPost]
        public Int32 AddTest(TestDetails test)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                return (obj.AddTest(test));
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            return 0;
        }
    }
}
