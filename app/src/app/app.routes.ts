import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';

//import auth guard and login component
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }