USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[SalesReport]    Script Date: 16-06-2020 02:03:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SalesReport]
(
@FromDate DateTime,
@ToDate DateTime
)
as
begin
	select CONVERT(Date, CreatedOn, 105) as CreatedOn, sum(TotalAmount) as TotalAmount,
	sum(DiscountAmount) as DiscountAmount, sum(NetAmount) as NetAmount, 
	sum(PaidAmount) as PaidAmount, sum(BalanceAmount) as BalanceAmount
	from PatientDetails join PaymentDetails on PatientDetails.PatientId = PaymentDetails.PatientId
	where CONVERT(Date, PatientDetails.CreatedOn, 105) Between
	CONVERT(Date, @FromDate, 105) AND CONVERT(Date, @ToDate, 105)
	OR
	CONVERT(Date, PatientDetails.CreatedOn, 105) Between
	CONVERT(Date, @ToDate, 105) AND CONVERT(Date, @FromDate, 105)
	group by CONVERT(Date, CreatedOn, 105)
end
GO
