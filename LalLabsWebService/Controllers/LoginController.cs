using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using LalLabsWebService.Models;
using LalLabsDataAccessLayer;
using LalLabsDataAccessLayer.Models;
using Newtonsoft.Json;

namespace LalLabsWebService.Controllers
{
    public class LoginController : ApiController
    {
        [HttpGet]
        public Boolean LoginValidation(string userName, string password)
        {
            try
            {
                Login login = new Login();
                login.UserName = userName;
                login.UserPassword = password;
                DataAccessLayer obj = new DataAccessLayer();
                Boolean status = obj.LoginValidation(login.UserName, login.UserPassword);
                return status;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return false;
        }

        [HttpGet]
        public string GetUserRole(string userName, string password)
        {
            try
            {
                DataAccessLayer obj = new DataAccessLayer();
                string userRole = obj.GetUserRole(userName,password);
                return userRole;
            }

            catch (Exception e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }

            return null;
        }
    }
}
