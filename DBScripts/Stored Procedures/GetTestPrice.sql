USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[GetTestPrice]    Script Date: 01-06-2020 00:37:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetTestPrice]
as
select * from TestPrice
return
GO

