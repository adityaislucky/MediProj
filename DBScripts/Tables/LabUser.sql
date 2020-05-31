USE [LalLabs]
GO

/****** Object:  Table [dbo].[LabUser]    Script Date: 01-06-2020 00:41:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[LabUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NULL,
	[UserPassword] [nvarchar](100) NULL,
	[UserRole] [nvarchar](100) NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [nvarchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
	[Column1] [nvarchar](100) NULL,
	[Column2] [nvarchar](100) NULL,
	[Column3] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

