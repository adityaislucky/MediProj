USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[UpdateTest]    Script Date: 01-06-2020 00:39:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[UpdateTest]
(
@TestId int,
@TestName varchar(30),
@TestPrice money,
@TestCode varchar(50)
)
as
begin
update TestPrice
set TestName=@TestName, TestPrice=@TestPrice, TestCode=@TestCode where TestId=@TestId
end
GO

