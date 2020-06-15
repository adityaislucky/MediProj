import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './admin/admin.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ForbiddenValidatorDirective } from './custom-directives/forbidden-value.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientService } from './patient-registration/patient-service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSavePatientComponent } from './dialog-save-patient/dialog-save-patient.component';
import { PatientGridComponent } from './patient-grid/patient-grid.component';
import { PatientGridService } from './patient-grid/patient-grid.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { NgxPopper } from 'angular-popper';
import { MatExpansionModule } from '@angular/material/expansion';
import { TestService } from './patient-registration/test-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { PhoneService } from './patient-registration/phone-service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestManagementComponent } from './test-management/test-management.component';
import { TestManagementService } from './test-management/test-management.service';
import { DialogTestManagementComponent } from './dialog-test-management/dialog-test-management.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SalesReportService } from './sales-report/sales-report.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { DialogSalesGraphComponent } from './dialog-sales-graph/dialog-sales-graph.component';
import { DatePipe } from '@angular/common';
import { DialogTodaySalesComponent } from './dialog-today-sales/dialog-today-sales.component';
import { TodaySalesService } from './dialog-today-sales/dialog-today-sales.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginComponent,
    AdminComponent,
    PatientRegistrationComponent,
    ForbiddenValidatorDirective,
    WelcomeComponent,
    PageNotFoundComponent,
    DialogSavePatientComponent,
    PatientGridComponent,
    TestManagementComponent,
    DialogTestManagementComponent,
    SalesReportComponent,
    DialogSalesGraphComponent,
    DialogTodaySalesComponent,
  ],
  entryComponents: [DialogSavePatientComponent, DialogTestManagementComponent, DialogSalesGraphComponent, DialogTodaySalesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSnackBarModule,
    NgxPopper,
    MatExpansionModule,
    MatMenuModule,
    MatRadioModule,
    MatAutocompleteModule,
    GoogleChartsModule
  ],
  providers: [DatePipe, LoginService, PatientService, PatientGridService, TestService, PhoneService, TestManagementService, SalesReportService, TodaySalesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
