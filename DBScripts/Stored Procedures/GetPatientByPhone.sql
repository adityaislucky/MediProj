USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetPatientByPhone]    Script Date: 01-06-2020 00:37:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[GetPatientByPhone]
@Phone varchar(15)
as
select * from PatientDetails left outer join HomeCollectionDetails on PatientDetails.PatientId = HomeCollectionDetails.PatientId 
join PaymentDetails on PatientDetails.PatientId = PaymentDetails.PatientId
where PatientDetails.CreatedOn in
(select MAX(PatientDetails.CreatedOn) from PatientDetails where PatientDetails.Phone=@Phone 
group by PatientDetails.FirstName,PatientDetails.LastName)
return
GO

