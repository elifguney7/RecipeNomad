import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';
import { TextUploadComponent } from './components/text-upload/text-upload.component';
import { SuccesfullyCreatedComponent } from './components/succesfully-created/succesfully-created.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AllRecipesComponent,
    CreateRecipeComponent,
    ProfileComponent,
    HomeComponent,
    DetailedRecipeComponent,
    AboutComponent,
    TextUploadComponent,
    SuccesfullyCreatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
