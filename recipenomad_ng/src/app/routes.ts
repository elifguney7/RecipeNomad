import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';

const routes: Routes = [

    { path: "all-recipes", component: AllRecipesComponent },
    { path: "create-recipes", component: CreateRecipeComponent },
    { path: "profile", component: ProfileComponent },
    { path: "home", component: HomeComponent },
    { path: "detailed-recipe", component: DetailedRecipeComponent },


    { path: '', redirectTo: "home", pathMatch: "full" },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }