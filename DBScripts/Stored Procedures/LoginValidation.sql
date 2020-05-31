USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[LoginValidation]    Script Date: 01-06-2020 00:38:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[LoginValidation] @UserName nvarchar(100), @UserPassword nvarchar(100)
AS
BEGIN
	IF EXISTS (SELECT * FROM LabUser AS L WHERE L.UserName= @UserName and L.UserPassword= @UserPassword)
		RETURN 1
	RETURN 0
END
GO

