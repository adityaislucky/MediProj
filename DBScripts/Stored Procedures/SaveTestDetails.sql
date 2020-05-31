USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[SaveTestDetails]    Script Date: 01-06-2020 00:39:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SaveTestDetails](
@PatientId BIGINT,
@TestId INT,
@TestName varchar(30),
@TestPrice money,
@TestCode varchar(50)
)
as
begin
insert into TestDetails
values(@PatientId,@TestId,@TestName,@TestPrice,@TestCode)
end
GO

