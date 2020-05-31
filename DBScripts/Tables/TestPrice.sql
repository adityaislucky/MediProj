USE [LalLabs]
GO

/****** Object:  Table [dbo].[TestPrice]    Script Date: 01-06-2020 00:42:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TestPrice](
	[TestId] [int] NOT NULL,
	[TestName] [varchar](30) NULL,
	[TestPrice] [money] NULL,
	[TestCode] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[TestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

