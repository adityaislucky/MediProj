USE [LalLabs]
GO
/****** Object:  StoredProcedure [dbo].[AddTest]    Script Date: 16-06-2020 02:03:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[AddTest]
(
@TestName varchar(50),
@TestCode varchar(50),
@TestPrice money
)
as
begin
	insert into TestPrice (TestName,TestCode,TestPrice)
	values(@TestName,@TestCode,@TestPrice)
	if exists(select * from TestPrice where TestId=(SELECT SCOPE_IDENTITY()))
		begin
			return 1
		end
	else
		begin
			return 0
		end
	end