USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetTestDetailsByPatientId]    Script Date: 01-06-2020 00:37:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetTestDetailsByPatientId]
(
@PatientId BIGINT
)
as
begin
select * from TestDetails where PatientId=@PatientId
end
GO

