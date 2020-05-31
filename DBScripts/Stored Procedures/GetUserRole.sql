USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetUserRole]    Script Date: 01-06-2020 00:38:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetUserRole]
@UserName nvarchar(100),
@UserPassword nvarchar(100),
@UserRole nvarchar(100) output
as
begin
select @UserRole = (select UserRole from LabUser where UserName = @UserName and UserPassword = @UserPassword)
end
GO

