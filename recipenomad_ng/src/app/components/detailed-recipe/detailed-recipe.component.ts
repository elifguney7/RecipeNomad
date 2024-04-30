// detailed-recipe.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model'; // Make sure the path is correct
import { environment } from 'src/app/environments/environment'; // Adjust path as necessary
import { Instruction } from 'src/app/models/recipe.model';
@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.css']
})
export class DetailedRecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe | undefined;
  private speechRecognition: any;
  isListening: boolean = false;  // Flag to track if speech recognition is active
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  handleVoiceCommand(command: string) {
    switch(command) {
      case 'start':
        this.startVideo();
        break;
      case 'stop':
        this.stopVideo();
        break;
    }
  }

  startVideo() {
    console.log('starting video');
    this.videoPlayer.nativeElement.play();
  }

  stopVideo() {
    console.log('stoping video');
    this.videoPlayer.nativeElement.pause();
  }

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the recipe ID from the route parameters
    this.route.params.subscribe(params => {
      const recipeId = params['id']; // Ensure that 'id' matches the route configuration parameter
      if (recipeId) {
        this.fetchRecipe(recipeId);
      }
    });
  }

  ngOnDestroy(): void {
    this.speechRecognition.stop();
  }

  toggleListening(): void {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening(): void {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.speechRecognition = new SpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = 'en-US';
    this.speechRecognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      this.handleVoiceCommand(command);
    };
    this.speechRecognition.start();
    this.isListening = true;
  }


  stopListening(): void {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
    this.isListening = false;
  }



  fetchRecipe(recipeId: string): void {
    this.recipeService.getRecipe(recipeId).subscribe({
      next: (data: any) => {  // Consider typing `data` more strictly if possible
        this.recipe = {
          ...data,
          instructions: typeof data.instructions === 'string' ? JSON.parse(data.instructions) as Instruction[] : data.instructions
        };
      },
      error: (err) => console.error('Failed to load recipe:', err)
    });
  }
 
  getFullMediaUrl(relativeUrl: string): string {
    return `${environment.apiUrl}/${relativeUrl}`; // Ensure environment.apiUrl is set to your server's URL
  }
}
