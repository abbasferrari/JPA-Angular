import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdDashboardComponent } from './ad-dashboard/ad-dashboard.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';

const routes: Routes = [
  {path : 'ads',component : AdDashboardComponent},
  {path : 'userdashboard',component:DashboardUserComponent},
  {path : 'register', component : RegisterUserComponent},
  {path : 'login', component : LoginComponent},
  {path : 'postad', component : PostAdComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'checkout',component : OrderCheckoutComponent},
 // { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OrderCheckoutComponent,LogoutComponent,PostAdComponent,AdDashboardComponent
                          ,DashboardUserComponent,LoginComponent,RegisterUserComponent];