import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard.service';

import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';
import { AboutComponent } from './components/about/about.component';
import { SignInComponent } from './components/sign-in/sign-in.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [

    { path: "all-recipes", component: AllRecipesComponent},
    { path: "create-recipes", component: CreateRecipeComponent, canActivate: [AuthGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "home", component: HomeComponent },
    { path: "detailed-recipe", component: DetailedRecipeComponent, canActivate: [AuthGuard] },
    { path: "about", component: AboutComponent },
    { path: "sign-in", component: SignInComponent},
    { path: "sign-up", component: SignUpComponent},


    { path: '', redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
