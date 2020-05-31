USE [LalLabs]
GO

/****** Object:  Table [dbo].[PatientDetails]    Script Date: 01-06-2020 00:41:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PatientDetails](
	[PatientId] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](5) NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[DateOfBirth] [datetime] NULL,
	[Phone] [varchar](15) NULL,
	[PAddress] [varchar](100) NULL,
	[DoctorName] [varchar](50) NULL,
	[Barcode] [varchar](100) NULL,
	[AddedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedOn] [datetime] NULL,
	[Email] [varchar](50) NULL,
	[Age] [varchar](30) NULL,
	[HomeCollection] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

