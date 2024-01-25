import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
//import auth guard and login component
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContactComponent } from './contact/contact.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';


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
        path: 'favorites',
        component: FavoritesComponent,
    },
    {
        path: 'contact',
        // canActivate: [authGuard],
        component: ContactComponent,
    },
    {
        path: 'my-recipe',
        component: MyRecipeComponent,
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }