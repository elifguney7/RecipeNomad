import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model'; // Make sure the path is correct
// detailed-recipe.component.ts
import { environment } from 'src/app/environments/environment'; // Adjust path as necessary

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.css']
})
export class DetailedRecipeComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const recipeId = "6624114fd1c1cd8df39149b3";
    if (recipeId) {
      this.recipeService.getRecipe(recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
        },
        error: (err) => console.error(err)
      });
    }
  }

  
getFullMediaUrl(relativeUrl: string): string {
  return `${environment.apiUrl}/${relativeUrl}`; // Ensure environment.apiUrl is set to your server's URL
}

}