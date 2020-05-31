//model for GetPatient
export class GetPatientDetails {

  public PatientId: number;
  public Title: string;
  public FirstName: string;
  public MiddleName?: string;
  public LastName: string;
  public DateOfBirth: Date;
  public Age: string;
  public Phone: string;
  public Address?: string;
  public Email?: string;
  public Barcode: string;
  public DoctorName: string;
  public HomeCollection: boolean;
  public CollectionDate: Date;
  public CollectedBy: string;
  public CollectionCharges: number;
  public CollectionAddress: string;
  public AddedBy: string;
  public CreatedOn: Date;
  public ModifiedOn: Date;
  public Malaria: boolean;
  public Typhoid: boolean;
  public PaymentMode: string;
  public TotalAmount: number;
  public PaidAmount: number;
  public NetAmount: number;
  public BalanceAmount: number;
  public Discount: number;
  public DiscountAmount: number;
}
