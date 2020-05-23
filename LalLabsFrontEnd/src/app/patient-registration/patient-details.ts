//model for patient-details
import { TestDetails } from './test-details';
import { PaymentDetails } from './payment-details';
import { HomeCollection } from './home-collection';

export class PatientDetails {

  Tests = new TestDetails();
  Payment = new PaymentDetails();
  HomeCollection = new HomeCollection();
  public Title: string;
  public FirstName: string;
  public MiddleName?: string;
  public LastName: string;
  public DateOfBirth: Date;
  public Age: string;
  public Phone: string;
  public Address?: string;
  public BarCode: string;
  public DoctorName: string;
  public AddedBy: string;
  public CreatedOn: Date;
  public ModifiedOn?: Date;
  public Email?: string;
  public Home: boolean;

}
