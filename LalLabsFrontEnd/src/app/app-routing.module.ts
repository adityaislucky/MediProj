import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientGridComponent } from './patient-grid/patient-grid.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'patientRegistration', component: PatientRegistrationComponent },
  { path: 'patientRegistration/:id', component: PatientRegistrationComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: 'patientGrid', component: PatientGridComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '/pageNotFound' }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
