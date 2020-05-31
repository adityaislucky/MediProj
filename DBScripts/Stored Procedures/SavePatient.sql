USE [LalLabs]
GO

/****** Object:  StoredProcedure [dbo].[SavePatient]    Script Date: 01-06-2020 00:38:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SavePatient]
(
@PatientId BIGINT OUTPUT,
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
As
BEGIN
INSERT INTO PatientDetails
(
Title, FirstName, MiddleName, LastName, DateOfBirth, Age, Phone, PAddress, DoctorName, Barcode, AddedBy, CreatedOn, ModifiedOn, Email, HomeCollection
)
Values
(
@Title, @FirstName, @MiddleName, @LastName, @DateOfBirth, @Age, @Phone, @PAddress, @DoctorName, @Barcode, @AddedBy, @CreatedOn, @ModifiedOn, @Email, @HomeCollection
)
Declare @temp BIGINT
SELECT @temp = (SELECT SCOPE_IDENTITY())
IF @HomeCollection=1
BEGIN
INSERT INTO HomeCollectionDetails
(
PatientId,CollectionDate, CollectedBy, CollectionCharges, CollectionAddress
)
Values
(
@temp,@CollectionDate,@CollectedBy,@CollectionCharges,@CollectionAddress
)
END
INSERT INTO PaymentDetails
(
PatientId, PaymentMode, TotalAmount, Discount, DiscountAmount, NetAmount, PaidAmount, BalanceAmount
)
VALUES
(
@temp, @PaymentMode, @TotalAmount, @Discount, @DiscountAmount, @NetAmount, @PaidAmount, @BalanceAmount
)
SELECT @PatientId = @temp
END
GO

