import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  latestRecipe?: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.filteredRecipes = this.recipes;
        this.latestRecipe = this.recipes[0];
        
      },
      error: (err) => console.error('Failed to get recipes', err)
    });
  }

  filterCategory(category: string) {
    this.filteredRecipes = this.recipes.filter(recipe => recipe.category === category);
  }

  getFullMediaUrl(relativeUrl: string): string {
    return `${environment.apiUrl}/${relativeUrl}`; // Ensure environment.apiUrl is set to your server's URL
  }

  deleteRecipe(recipeId: string) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      this.recipeService.deleteRecipe(recipeId).subscribe({
        next: () => {
          console.log('Recipe deleted successfully');
          this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
          this.loadRecipes();
        },
        error: (err) => {
          console.error('Error deleting recipe', err);
          alert('Failed to delete the recipe');
        }
      });
    }
  }
}

