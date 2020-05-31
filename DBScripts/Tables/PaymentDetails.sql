USE [LalLabs]
GO

/****** Object:  Table [dbo].[PaymentDetails]    Script Date: 01-06-2020 00:41:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PaymentDetails](
	[PatientId] [bigint] NOT NULL,
	[PaymentMode] [varchar](20) NULL,
	[TotalAmount] [money] NULL,
	[Discount] [real] NULL,
	[DiscountAmount] [money] NULL,
	[NetAmount] [money] NULL,
	[PaidAmount] [money] NULL,
	[BalanceAmount] [money] NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

