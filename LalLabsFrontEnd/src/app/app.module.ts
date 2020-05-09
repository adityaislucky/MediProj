import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatRippleModule } from '@angular/material/core';

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
    PatientGridComponent
  ],
  entryComponents: [DialogSavePatientComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    MatRippleModule
  ],
  providers: [LoginService, PatientService, PatientGridService],
  bootstrap: [AppComponent]
})
export class AppModule { }
