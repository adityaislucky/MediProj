USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[UpdatePatient]    Script Date: 01-06-2020 00:39:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[UpdatePatient]
(
@UpdatedId BIGINT output,
@PatientId BIGINT,
@Title VARCHAR(5),
@FirstName VARCHAR(50),
@MiddleName VARCHAR(50) = NULL,
@LastName VARCHAR(50),
@DateOfBirth DATETIME,
@Age VARCHAR(30),
@Phone VARCHAR(15),
@PAddress VARCHAR(100) = NULL,
@Email VARCHAR(50) = NULL,
@DoctorName VARCHAR(50),
@Barcode VARCHAR(100),
@HomeCollection BIT,
@CollectionDate DATETIME = NULL,
@CollectedBy VARCHAR(50) = NULL,
@CollectionCharges MONEY = NULL,
@CollectionAddress VARCHAR(100) = NULL,
@PaymentMode VARCHAR(20),
@TotalAmount MONEY,
@Discount Float(2),
@DiscountAmount MONEY,
@NetAmount MONEY,
@PaidAmount MONEY,
@BalanceAmount MONEY,
@AddedBy VARCHAR(50),
@CreatedOn DATETIME,
@ModifiedOn DATETIME = NULL
)
as
begin
update PatientDetails
set Title=@Title, FirstName=@FirstName, MiddleName=@MiddleName, LastName=@LastName, DateOfBirth=@DateOfBirth, Phone=@Phone, PAddress=@PAddress, DoctorName=@DoctorName,
Barcode=@Barcode, AddedBy=@AddedBy, CreatedOn=@CreatedOn, ModifiedOn=@ModifiedOn, Email=@Email, Age=@Age, HomeCollection=@HomeCollection
where PatientId=@PatientId

if @HomeCollection=1
begin
if exists (select * from HomeCollectionDetails where PatientId=@PatientId)
begin
update HomeCollectionDetails
set CollectionDate=@CollectionDate, CollectionCharges=@CollectionCharges, CollectionAddress=@CollectionAddress, CollectedBy=@CollectedBy
where PatientId=@PatientId
end
else
begin
insert into HomeCollectionDetails(PatientId,CollectionDate,CollectionCharges,CollectionAddress,CollectedBy)
values(@PatientId,@CollectionDate,@CollectionCharges,@CollectionAddress,@CollectedBy)
end
end

if @HomeCollection=0
begin
if exists (select * from HomeCollectionDetails where PatientId = @PatientId)
begin
delete from HomeCollectionDetails
where PatientId=@PatientId
end
end

update PaymentDetails
set PaymentMode=@PaymentMode, TotalAmount=@TotalAmount, Discount=@Discount, DiscountAmount=@DiscountAmount, NetAmount=@NetAmount, PaidAmount=@PaidAmount, BalanceAmount=@BalanceAmount
where PatientId=@PatientId

set @UpdatedId=@PatientId
end
GO

