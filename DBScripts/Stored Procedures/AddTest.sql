USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[AddTest]    Script Date: 03-06-2020 01:00:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[AddTest]
(
@TestName varchar(50),
@TestCode varchar(50),
@TestPrice money
)
as
begin
insert into TestPrice (TestName,TestCode,TestPrice)
values(@TestName,@TestCode,@TestPrice)
end
GO

