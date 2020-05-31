USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[DeleteTestDetailsByPatientId]    Script Date: 01-06-2020 00:31:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[DeleteTestDetailsByPatientId]
(
@PatientId BIGINT
)
as
begin
delete from TestDetails where PatientId=@PatientId
end
GO

