USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[TodaySales]    Script Date: 16-06-2020 02:03:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[TodaySales]
as
begin
	select CONVERT(Date, CreatedOn, 105) as CreatedOn, sum(TotalAmount) as TotalAmount,
	sum(DiscountAmount) as DiscountAmount, sum(NetAmount) as NetAmount, 
	sum(PaidAmount) as PaidAmount, sum(BalanceAmount) as BalanceAmount
	from PatientDetails join PaymentDetails on PatientDetails.PatientId = PaymentDetails.PatientId
	where CONVERT(Date, PatientDetails.CreatedOn, 105) = CONVERT(Date, GetDate(), 105)
	group by CONVERT(Date, CreatedOn, 105)
end
GO

