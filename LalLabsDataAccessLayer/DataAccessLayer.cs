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
using Microsoft.SqlServer.Server;
using System.Diagnostics;

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
			try
			{
				cmdLalLabs = new SqlCommand("SavePatient", conLalLabs);
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
				cmdLalLabs.Parameters.AddWithValue("@Email", patient.Email);
				cmdLalLabs.Parameters.AddWithValue("@DoctorName", patient.DoctorName);
				cmdLalLabs.Parameters.AddWithValue("@HomeCollection", patient.Home);
				cmdLalLabs.Parameters.AddWithValue("@CollectionDate", patient.HomeCollection.CollectionDate);
				cmdLalLabs.Parameters.AddWithValue("@CollectedBy", patient.HomeCollection.CollectedBy);
				cmdLalLabs.Parameters.AddWithValue("@CollectionCharges", patient.HomeCollection.CollectionCharges);
				cmdLalLabs.Parameters.AddWithValue("@CollectionAddress", patient.HomeCollection.CollectionAddress);
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

				foreach (TestDetails test in patient.Tests)
				{
					cmdLalLabs = new SqlCommand("SaveTestDetails", conLalLabs);
					cmdLalLabs.CommandType = CommandType.StoredProcedure;
					cmdLalLabs.Parameters.AddWithValue("@PatientId", status);
					cmdLalLabs.Parameters.AddWithValue("@TestId", test.TestId);
					cmdLalLabs.Parameters.AddWithValue("@TestName", test.TestName);
					cmdLalLabs.Parameters.AddWithValue("@TestPrice", test.TestPrice);
					cmdLalLabs.Parameters.AddWithValue("@TestCode", test.TestCode);
					cmdLalLabs.ExecuteNonQuery();
				}

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

		public PatientDetails[] PatientGrid()
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("PatientGrid", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				SqlDataAdapter da = new SqlDataAdapter(cmdLalLabs);
				DataTable dt = new DataTable();
				da.Fill(dt);
				List<PatientDetails> Patients = new List<PatientDetails>();
				foreach(DataRow row in dt.Rows)
				{
					var Patient = new PatientDetails();
					Patient.Phone = row["Phone"].ToString();
					Patient.PatientId = (long)row["PatientId"];
					Patient.Title = row["Title"].ToString();
					Patient.FirstName = row["FirstName"].ToString();
					Patient.MiddleName = row["MiddleName"].ToString();
					Patient.LastName = row["LastName"].ToString();
					Patient.DateOfBirth = (DateTime)row["DateOfBirth"];
					Patient.Age = row["Age"].ToString();
					Patient.Address = row["PAddress"].ToString();
					Patient.DoctorName = row["DoctorName"].ToString();
					Patient.Barcode = row["Barcode"].ToString();
					Patient.AddedBy = row["AddedBy"].ToString();
					Patient.CreatedOn = (DateTime)row["CreatedOn"];
					Patient.ModifiedOn = Convert.IsDBNull(row["ModifiedOn"]) ? null : (DateTime?)row["ModifiedOn"];
					Patient.Email = row["Email"].ToString();
					Patient.Home = (Boolean)row["HomeCollection"];
					Patient.Payment.PaymentMode = row["PaymentMode"].ToString();
					Patient.Payment.TotalAmount = (decimal)row["TotalAmount"];
					Patient.Payment.Discount = Convert.ToDecimal(row["Discount"]);
					Patient.Payment.DiscountAmount = (decimal)row["DiscountAmount"];
					Patient.Payment.NetAmount = (decimal)row["NetAmount"];
					Patient.Payment.PaidAmount = (decimal)row["PaidAmount"];
					Patient.Payment.BalanceAmount = (decimal)row["BalanceAmount"];
					Patient.HomeCollection.CollectedBy = Convert.IsDBNull(row["CollectedBy"]) ? null : (string)row["CollectedBy"];
					Patient.HomeCollection.CollectionDate = Convert.IsDBNull(row["CollectionDate"]) ? null : (DateTime?)row["CollectionDate"];
					Patient.HomeCollection.CollectionCharges = Convert.IsDBNull(row["CollectionCharges"]) ? 0 : (decimal)row["CollectionCharges"];
					Patient.HomeCollection.CollectionAddress = Convert.IsDBNull(row["CollectionAddress"]) ? null : (string)row["CollectionAddress"];

					cmdLalLabs = new SqlCommand("GetTestDetailsByPatientId", conLalLabs);
					cmdLalLabs.CommandType = CommandType.StoredProcedure;
					cmdLalLabs.Parameters.AddWithValue("@PatientId", Patient.PatientId);
					da = new SqlDataAdapter(cmdLalLabs);
					dt = new DataTable();
					da.Fill(dt);
					foreach (DataRow tempRow in dt.Rows)
					{
						TestDetails tempTestDetail = new TestDetails();
						tempTestDetail.TestId = (Int32)tempRow["TestId"];
						tempTestDetail.TestCode = tempRow["TestCode"].ToString();
						tempTestDetail.TestName = tempRow["TestName"].ToString();
						tempTestDetail.TestPrice = (decimal)tempRow["TestPrice"];
						Patient.Tests.Add(tempTestDetail);
					}

					Patients.Add(Patient);
				}
				
				return Patients.ToArray();
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

		public PatientDetails GetPatient(long PatientId)
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("GetPatientByPatientId", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@PatientId", PatientId);
				SqlDataAdapter da = new SqlDataAdapter(cmdLalLabs);
				DataTable dt = new DataTable();
				da.Fill(dt);
				DataRow row = dt.Rows[0];
				var Patient = new PatientDetails();
				Patient.Phone = row["Phone"].ToString();
				Patient.PatientId = (long)row["PatientId"];
				Patient.Title = row["Title"].ToString();
				Patient.FirstName = row["FirstName"].ToString();
				Patient.MiddleName = row["MiddleName"].ToString();
				Patient.LastName = row["LastName"].ToString();
				Patient.DateOfBirth = (DateTime)row["DateOfBirth"];
				Patient.Age = row["Age"].ToString();
				Patient.Address = row["PAddress"].ToString();
				Patient.DoctorName = row["DoctorName"].ToString();
				Patient.Barcode = row["Barcode"].ToString();
				Patient.AddedBy = row["AddedBy"].ToString();
				Patient.CreatedOn = (DateTime)row["CreatedOn"];
				Patient.ModifiedOn = Convert.IsDBNull(row["ModifiedOn"]) ? null: (DateTime?)row["ModifiedOn"];
				Patient.Email = row["Email"].ToString();
				Patient.Home = (Boolean)row["HomeCollection"];
				Patient.Payment.PaymentMode = row["PaymentMode"].ToString();
				Patient.Payment.TotalAmount = (decimal)row["TotalAmount"];
				Patient.Payment.Discount = Convert.ToDecimal(row["Discount"]);
				Patient.Payment.DiscountAmount = (decimal)row["DiscountAmount"];
				Patient.Payment.NetAmount = (decimal)row["NetAmount"];
				Patient.Payment.PaidAmount = (decimal)row["PaidAmount"];
				Patient.Payment.BalanceAmount = (decimal)row["BalanceAmount"];
				Patient.HomeCollection.CollectedBy = Convert.IsDBNull(row["CollectedBy"]) ? null : (string)row["CollectedBy"];
				Patient.HomeCollection.CollectionDate = Convert.IsDBNull(row["CollectionDate"]) ? null : (DateTime?)row["CollectionDate"];
				Patient.HomeCollection.CollectionCharges = Convert.IsDBNull(row["CollectionCharges"]) ? 0 : (decimal)row["CollectionCharges"];
				Patient.HomeCollection.CollectionAddress = Convert.IsDBNull(row["CollectionAddress"]) ? null : (string)row["CollectionAddress"];

				cmdLalLabs = new SqlCommand("GetTestDetailsByPatientId", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@PatientId", PatientId);
				da = new SqlDataAdapter(cmdLalLabs);
				dt = new DataTable();
				da.Fill(dt);
				foreach(DataRow tempRow in dt.Rows)
				{
					TestDetails tempTestDetail = new TestDetails();
					tempTestDetail.TestId = (Int32)tempRow["TestId"];
					tempTestDetail.TestCode = tempRow["TestCode"].ToString();
					tempTestDetail.TestName = tempRow["TestName"].ToString();
					tempTestDetail.TestPrice = (decimal)tempRow["TestPrice"];
					Patient.Tests.Add(tempTestDetail);
				}
				return Patient;
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

		public TestDetails[] GetTestPrice()
		{
			cmdLalLabs = new SqlCommand("GetTestPrice", conLalLabs);
			DataTable dt = new DataTable();
			try
			{
				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				SqlDataAdapter da = new SqlDataAdapter(cmdLalLabs);
				da.Fill(dt);
				List<TestDetails> tests = new List<TestDetails>();
				foreach(DataRow row in dt.Rows)
				{
					TestDetails test = new TestDetails();
					test.TestId = (Int32)row["TestId"];
					test.TestCode = row["TestCode"].ToString();
					test.TestName = row["TestName"].ToString();
					test.TestPrice = (decimal)row["TestPrice"];
					tests.Add(test);
				}
				return tests.ToArray();
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

		public DataTable GetAllPhones()
		{
			cmdLalLabs = new SqlCommand("GetAllPhones", conLalLabs);
			DataTable dt = new DataTable();
			try
			{
				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
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

		public PatientDetails[] GetPatientByPhone(string phone)
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("GetPatientByPhone", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@Phone", phone);
				SqlDataAdapter da = new SqlDataAdapter(cmdLalLabs);
				DataTable dt = new DataTable();
				da.Fill(dt);
				List<PatientDetails> Patients = new List<PatientDetails>();
				foreach (DataRow row in dt.Rows)
				{
					var Patient = new PatientDetails();
					Patient.Phone = row["Phone"].ToString();
					Patient.PatientId = (long)row["PatientId"];
					Patient.Title = row["Title"].ToString();
					Patient.FirstName = row["FirstName"].ToString();
					Patient.MiddleName = row["MiddleName"].ToString();
					Patient.LastName = row["LastName"].ToString();
					Patient.DateOfBirth = (DateTime)row["DateOfBirth"];
					Patient.Age = row["Age"].ToString();
					Patient.Address = row["PAddress"].ToString();
					Patient.DoctorName = row["DoctorName"].ToString();
					Patient.Barcode = row["Barcode"].ToString();
					Patient.AddedBy = row["AddedBy"].ToString();
					Patient.CreatedOn = (DateTime)row["CreatedOn"];
					Patient.ModifiedOn = Convert.IsDBNull(row["ModifiedOn"]) ? null : (DateTime?)row["ModifiedOn"];
					Patient.Email = row["Email"].ToString();
					Patient.Home = (Boolean)row["HomeCollection"];
					Patient.Payment.PaymentMode = row["PaymentMode"].ToString();
					Patient.Payment.TotalAmount = (decimal)row["TotalAmount"];
					Patient.Payment.Discount = Convert.ToDecimal(row["Discount"]);
					Patient.Payment.DiscountAmount = (decimal)row["DiscountAmount"];
					Patient.Payment.NetAmount = (decimal)row["NetAmount"];
					Patient.Payment.PaidAmount = (decimal)row["PaidAmount"];
					Patient.Payment.BalanceAmount = (decimal)row["BalanceAmount"];
					Patient.HomeCollection.CollectedBy = Convert.IsDBNull(row["CollectedBy"]) ? null : (string)row["CollectedBy"];
					Patient.HomeCollection.CollectionDate = Convert.IsDBNull(row["CollectionDate"]) ? null : (DateTime?)row["CollectionDate"];
					Patient.HomeCollection.CollectionCharges = Convert.IsDBNull(row["CollectionCharges"]) ? 0 : (decimal)row["CollectionCharges"];
					Patient.HomeCollection.CollectionAddress = Convert.IsDBNull(row["CollectionAddress"]) ? null : (string)row["CollectionAddress"];

					cmdLalLabs = new SqlCommand("GetTestDetailsByPatientId", conLalLabs);
					cmdLalLabs.CommandType = CommandType.StoredProcedure;
					cmdLalLabs.Parameters.AddWithValue("@PatientId", Patient.PatientId);
					da = new SqlDataAdapter(cmdLalLabs);
					dt = new DataTable();
					da.Fill(dt);
					foreach (DataRow tempRow in dt.Rows)
					{
						TestDetails tempTestDetail = new TestDetails();
						tempTestDetail.TestId = (Int32)tempRow["TestId"];
						tempTestDetail.TestCode = tempRow["TestCode"].ToString();
						tempTestDetail.TestName = tempRow["TestName"].ToString();
						tempTestDetail.TestPrice = (decimal)tempRow["TestPrice"];
						Patient.Tests.Add(tempTestDetail);
					}

					Patients.Add(Patient);
				}

				return Patients.ToArray();
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

		public string GetUserRole(string UserName, string UserPassword)
		{
			cmdLalLabs = new SqlCommand("GetUserRole", conLalLabs);
			try
			{

				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@UserName", UserName);
				cmdLalLabs.Parameters.AddWithValue("@UserPassword", UserPassword);

				SqlParameter UserRole = cmdLalLabs.Parameters.Add("@UserRole", SqlDbType.NVarChar, 100);
				UserRole.Direction = ParameterDirection.Output;
				cmdLalLabs.ExecuteNonQuery();
				return UserRole.Value.ToString();
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

		public long UpdatePatient(PatientDetails patient)
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("UpdatePatient", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@PatientId", patient.PatientId);
				cmdLalLabs.Parameters.AddWithValue("@Title", patient.Title);
				cmdLalLabs.Parameters.AddWithValue("@FirstName", patient.FirstName);
				cmdLalLabs.Parameters.AddWithValue("@MiddleName", patient.MiddleName);
				cmdLalLabs.Parameters.AddWithValue("@LastName", patient.LastName);
				cmdLalLabs.Parameters.AddWithValue("@DateOfBirth", patient.DateOfBirth);
				cmdLalLabs.Parameters.AddWithValue("@Age", patient.Age);
				cmdLalLabs.Parameters.AddWithValue("@Phone", patient.Phone);
				cmdLalLabs.Parameters.AddWithValue("@PAddress", patient.Address);
				cmdLalLabs.Parameters.AddWithValue("@Email", patient.Email);
				cmdLalLabs.Parameters.AddWithValue("@DoctorName", patient.DoctorName);
				cmdLalLabs.Parameters.AddWithValue("@HomeCollection", patient.Home);
				cmdLalLabs.Parameters.AddWithValue("@CollectionDate", patient.HomeCollection.CollectionDate);
				cmdLalLabs.Parameters.AddWithValue("@CollectedBy", patient.HomeCollection.CollectedBy);
				cmdLalLabs.Parameters.AddWithValue("@CollectionCharges", patient.HomeCollection.CollectionCharges);
				cmdLalLabs.Parameters.AddWithValue("@CollectionAddress", patient.HomeCollection.CollectionAddress);
				cmdLalLabs.Parameters.AddWithValue("@Barcode", patient.Barcode);
				cmdLalLabs.Parameters.AddWithValue("@PaymentMode", patient.Payment.PaymentMode);
				cmdLalLabs.Parameters.AddWithValue("@TotalAmount", patient.Payment.TotalAmount);
				cmdLalLabs.Parameters.AddWithValue("@Discount", patient.Payment.Discount);
				cmdLalLabs.Parameters.AddWithValue("@DiscountAmount", patient.Payment.DiscountAmount);
				cmdLalLabs.Parameters.AddWithValue("@NetAmount", patient.Payment.NetAmount);
				cmdLalLabs.Parameters.AddWithValue("@PaidAmount", patient.Payment.PaidAmount);
				cmdLalLabs.Parameters.AddWithValue("@BalanceAmount", patient.Payment.BalanceAmount);
				cmdLalLabs.Parameters.AddWithValue("@AddedBy", patient.AddedBy);
				cmdLalLabs.Parameters.AddWithValue("@CreatedOn", patient.CreatedOn);
				cmdLalLabs.Parameters.AddWithValue("@ModifiedOn", patient.ModifiedOn);


				SqlParameter UpdatedId = new SqlParameter();
				UpdatedId.ParameterName = "@UpdatedId";
				UpdatedId.Direction = System.Data.ParameterDirection.Output;
				UpdatedId.SqlDbType = System.Data.SqlDbType.BigInt;
				cmdLalLabs.Parameters.Add(UpdatedId);

				cmdLalLabs.ExecuteNonQuery();
				long status = (long)UpdatedId.Value;

				cmdLalLabs = new SqlCommand("DeleteTestDetailsByPatientId", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@PatientId", patient.PatientId);
				cmdLalLabs.ExecuteNonQuery();

				foreach (TestDetails test in patient.Tests)
				{
					cmdLalLabs = new SqlCommand("SaveTestDetails", conLalLabs);
					cmdLalLabs.CommandType = CommandType.StoredProcedure;
					cmdLalLabs.Parameters.AddWithValue("@PatientId", status);
					cmdLalLabs.Parameters.AddWithValue("@TestId", test.TestId);
					cmdLalLabs.Parameters.AddWithValue("@TestName", test.TestName);
					cmdLalLabs.Parameters.AddWithValue("@TestPrice", test.TestPrice);
					cmdLalLabs.Parameters.AddWithValue("@TestCode", test.TestCode);
					cmdLalLabs.ExecuteNonQuery();
				}

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

		public Int32 UpdateTest(TestDetails test)
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("UpdateTest", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@TestId", test.TestId);
				cmdLalLabs.Parameters.AddWithValue("@TestName", test.TestName);
				cmdLalLabs.Parameters.AddWithValue("@TestPrice", test.TestPrice);
				cmdLalLabs.Parameters.AddWithValue("@TestCode", test.TestCode);
				SqlParameter returnParameter = cmdLalLabs.Parameters.Add("RetVal", SqlDbType.Int);
				returnParameter.Direction = ParameterDirection.ReturnValue;
				cmdLalLabs.ExecuteNonQuery();
				int status = (int)returnParameter.Value;
				cmdLalLabs.ExecuteNonQuery();
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

		public Int32 AddTest(TestDetails test)
		{
			try
			{
				conLalLabs.Open();
				cmdLalLabs = new SqlCommand("AddTest", conLalLabs);
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
				cmdLalLabs.Parameters.AddWithValue("@TestName", test.TestName);
				cmdLalLabs.Parameters.AddWithValue("@TestPrice", test.TestPrice);
				cmdLalLabs.Parameters.AddWithValue("@TestCode", test.TestCode);
				SqlParameter returnParameter = cmdLalLabs.Parameters.Add("RetVal", SqlDbType.Int);
				returnParameter.Direction = ParameterDirection.ReturnValue;
				cmdLalLabs.ExecuteNonQuery();
				int status = (int)returnParameter.Value;
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

		public DataTable SalesReport(DateTime FromDate, DateTime ToDate)
		{
			try
			{
				cmdLalLabs = new SqlCommand("SalesReport", conLalLabs);
				cmdLalLabs.Parameters.AddWithValue("@FromDate", FromDate);
				cmdLalLabs.Parameters.AddWithValue("@ToDate", ToDate);
				DataTable dt = new DataTable();
				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
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

		public DataTable TodaySales()
		{
			cmdLalLabs = new SqlCommand("TodaySales", conLalLabs);
			DataTable dt = new DataTable();
			try
			{
				conLalLabs.Open();
				cmdLalLabs.CommandType = CommandType.StoredProcedure;
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
