USE [LalLabs]
GO

/****** Object:  Table [dbo].[HomeCollectionDetails]    Script Date: 01-06-2020 00:40:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[HomeCollectionDetails](
	[PatientId] [bigint] NOT NULL,
	[CollectionDate] [datetime] NULL,
	[CollectedBy] [varchar](50) NULL,
	[CollectionCharges] [money] NULL,
	[CollectionAddress] [varchar](100) NULL,
 CONSTRAINT [PK_HomeCollectionDetails] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

