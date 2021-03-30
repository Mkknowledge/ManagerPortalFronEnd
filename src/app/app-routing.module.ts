import { StripeComponent } from './stripe/stripe.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { LogoutComponent } from './logout/logout.component';



const routes: Routes = [

  {path: '', redirectTo: 'login',pathMatch:'full'},
  {path: 'viewemployee', component: EmployeeComponent,canActivate:[AuthGaurdService]},
  {path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGaurdService]},
  {path: 'updateemployee', component: UpdateEmployeeComponent,canActivate:[AuthGaurdService]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent,canActivate:[AuthGaurdService]},
  {path: 'signup', component: SignupComponent,canActivate:[AuthGaurdService]},
  {path: "stripe", component: StripeComponent,canActivate:[AuthGaurdService]},
  {path: "logout", component: LogoutComponent,canActivate:[AuthGaurdService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
