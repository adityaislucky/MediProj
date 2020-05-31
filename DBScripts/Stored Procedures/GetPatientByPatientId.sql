USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetPatientByPatientId]    Script Date: 01-06-2020 00:36:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetPatientByPatientId]
@PatientId BIGINT
AS
select * from PatientDetails
JOIN PaymentDetails ON PatientDetails.PatientID = PaymentDetails.PatientId 
LEFT OUTER JOIN HomeCollectionDetails ON PatientDetails.PatientId = HomeCollectionDetails.PatientId
where PatientDetails.PatientId = @PatientId
return
GO

