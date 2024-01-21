import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
=======
import { NgModule } from '@angular/core';

//import auth guard and login component
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
>>>>>>> 562b1fb9f6f467b91c4c31e38ae6e92b853e8844


// all local routes
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
    },
    {
        path: 'create-recipe',
        component: CreateRecipeComponent,
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }