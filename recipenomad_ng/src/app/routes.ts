import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [

    { path: "all-recipes", component: AllRecipesComponent },
    { path: "create-recipes", component: CreateRecipeComponent },
    { path: "profile", component: ProfileComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }