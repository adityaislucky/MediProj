USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetUserDetails]    Script Date: 01-06-2020 00:37:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserDetails](
@userName nvarchar(100),
@password nvarchar (100),
@role nvarchar(100)

)
AS
BEGIN
	BEGIN TRY
		SELECT * FROM dbo.LabUser WHERE UserName=@userName AND UserPassword=@password AND UserRole=@role; 
	END TRY
	BEGIN CATCH
		SELECT
		ERROR_MESSAGE();
	END CATCH
END
GO

