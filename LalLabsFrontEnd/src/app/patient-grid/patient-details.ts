//model for patient
import { TestDetails } from './test-details';
import { PaymentDetails } from './payment-details';

export class PatientDetails {

  Tests = new TestDetails();
  Payment = new PaymentDetails();

  public PatientId: number;
  public Title: string;
  public FirstName: string;
  public MiddleName?: string;
  public LastName: string;
  public DateOfBirth: Date;
  public Age: number;
  public Phone: number;
  public Address?: string;
  public BarCode: string;
  public DoctorName: string;
  public AddedBy: string;
  public CreatedOn: Date;
  public ModifiedOn: Date;
}
