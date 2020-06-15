USE [LalLabs]
GO
/****** Object:  StoredProcedure [dbo].[UpdateTest]    Script Date: 16-06-2020 02:04:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[UpdateTest]
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
if exists(select * from TestPrice where TestId= @TestId and TestName=@TestName and TestPrice=@TestPrice and TestCode=@TestCode)
	begin
		return 1
	end
else
	begin
		return 0
	end
end