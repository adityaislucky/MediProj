using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.CodeDom;
using LalLabsDataAccessLayer.Models;

namespace LalLabsDataAccessLayer
{
	public class DataAccessLayer
	{
		SqlConnection conLalLabs;
		SqlCommand cmdLalLabs;

		public DataAccessLayer()
		{
			// Initialize the connection
			conLalLabs = new SqlConnection(ConfigurationManager.ConnectionStrings["conLalLabs"].ToString());
		}

		public bool TestConnection()
		{
			
			bool status = false;
			try
			{
				if (conLalLabs.State == ConnectionState.Closed)
				{
					conLalLabs.Open(); //Open connection         
					status = true;
				}
			}
			catch
			{
				status = false;
			}
			finally
			{
				//Close connection
				conLalLabs.Close();
			}
			return status;
		}

		public bool LoginValidation(string UserName, string UserPassword)
		{

			cmdLalLabs = new SqlCommand("LoginValidation", conLalLabs);
			try
			{

				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@UserName", UserName);
				cmdLalLabs.Parameters.AddWithValue("@UserPassword", UserPassword);
				SqlParameter returnParameter = cmdLalLabs.Parameters.Add("RetVal", SqlDbType.Int);
				returnParameter.Direction = ParameterDirection.ReturnValue;
				cmdLalLabs.ExecuteNonQuery();
				int status = (int)returnParameter.Value;
				if (status == 1)
					return true;
			}

			catch (SqlException e)
			{
				Console.WriteLine("Error Generated. Details: " + e.ToString());
			}


			finally
			{
				conLalLabs.Close();
			}

			return false;
		}

		public long SavePatient(PatientDetails patient)
		{
			cmdLalLabs = new SqlCommand("SavePatient", conLalLabs);
			try
			{

				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@Title", patient.Title);
				cmdLalLabs.Parameters.AddWithValue("@FirstName", patient.FirstName);
				cmdLalLabs.Parameters.AddWithValue("@MiddleName", patient.MiddleName);
				cmdLalLabs.Parameters.AddWithValue("@LastName", patient.LastName);
				cmdLalLabs.Parameters.AddWithValue("@DateOfBirth", patient.DateOfBirth);
				cmdLalLabs.Parameters.AddWithValue("@Age", patient.Age);
				cmdLalLabs.Parameters.AddWithValue("@Phone", patient.Phone);
				cmdLalLabs.Parameters.AddWithValue("@PAddress", patient.Address);
				cmdLalLabs.Parameters.AddWithValue("@DoctorName", patient.DoctorName);
				cmdLalLabs.Parameters.AddWithValue("@Malaria", patient.Tests.Malaria);
				cmdLalLabs.Parameters.AddWithValue("@Typhoid", patient.Tests.Typhoid);
				cmdLalLabs.Parameters.AddWithValue("@Barcode", patient.Barcode);
				cmdLalLabs.Parameters.AddWithValue("@PaymentMode", patient.Payment.PaymentMode);
				cmdLalLabs.Parameters.AddWithValue("@TotalAmount", patient.Payment.TotalAmount);
				cmdLalLabs.Parameters.AddWithValue("@Discount", patient.Payment.Discount);
				cmdLalLabs.Parameters.AddWithValue("@DiscountAmount", patient.Payment.DiscountAmount);
				cmdLalLabs.Parameters.AddWithValue("@NetAmount", patient.Payment.NetAmount);
				cmdLalLabs.Parameters.AddWithValue("@PaidAmount", patient.Payment.PaidAmount);
				cmdLalLabs.Parameters.AddWithValue("@BalanceAmount", patient.Payment.BalanceAmount);
				cmdLalLabs.Parameters.AddWithValue("@AddedBy",patient.AddedBy);
				cmdLalLabs.Parameters.AddWithValue("@CreatedOn", patient.CreatedOn);
				cmdLalLabs.Parameters.AddWithValue("@ModifiedOn", patient.ModifiedOn);


				SqlParameter PatientId = new SqlParameter();
				PatientId.ParameterName = "@PatientId";
				PatientId.Direction = System.Data.ParameterDirection.Output;
				PatientId.SqlDbType = System.Data.SqlDbType.BigInt;
				cmdLalLabs.Parameters.Add(PatientId);

				cmdLalLabs.ExecuteNonQuery();
				long status = (long)PatientId.Value;
				return status;
			}

			catch (SqlException e)
			{
				Console.WriteLine("Error Generated. Details: " + e.ToString());
			}


			finally
			{
				conLalLabs.Close();
			}

			return 0;
		}

		public DataTable PatientGrid(string AddedBy)
		{
			cmdLalLabs = new SqlCommand("PatientGrid", conLalLabs);
			DataTable dt = new DataTable();
			try
			{
				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@AddedBy", AddedBy);
				SqlDataAdapter da = new SqlDataAdapter(cmdLalLabs);
				da.Fill(dt);
				return dt;
			}
			catch (SqlException e)
			{
				Console.WriteLine("Error Generated. Details: " + e.ToString());
			}
			finally
			{
				conLalLabs.Close();
			}
			return null;
		}

	}
}
