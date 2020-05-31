USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetAllPhones]    Script Date: 01-06-2020 00:35:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[GetAllPhones]
as
select distinct Phone from PatientDetails
return
GO

