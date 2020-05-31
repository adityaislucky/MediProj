USE [LalLabs]
GO

/****** Object:  Table [dbo].[TestDetails]    Script Date: 01-06-2020 00:42:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TestDetails](
	[PatientId] [bigint] NULL,
	[TestId] [int] NULL,
	[TestName] [varchar](30) NULL,
	[TestPrice] [money] NULL,
	[TestCode] [varchar](50) NULL
) ON [PRIMARY]
GO

