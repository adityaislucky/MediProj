USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[PatientGrid]    Script Date: 01-06-2020 00:38:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[PatientGrid]
@AddedBy varchar(20)
as
select * from PatientDetails
JOIN PaymentDetails ON PatientDetails.PatientID = PaymentDetails.PatientId
LEFT OUTER JOIN HomeCollectionDetails ON PatientDetails.PatientId = HomeCollectionDetails.PatientId
where PatientDetails.AddedBy = @AddedBy
order by PatientDetails.CreatedOn desc
return
GO

