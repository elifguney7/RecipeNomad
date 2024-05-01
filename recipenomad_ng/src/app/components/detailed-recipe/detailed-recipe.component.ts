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
  private speechSynthesis: SpeechSynthesis = window.speechSynthesis;

  handleVoiceCommand(command: string) {
    switch(command) {
      case 'start':
        this.startVideo();
        break;
      case 'stop':
        this.stopVideo();
        break;
      case 'next':
        this.readInstructions();
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
    this.speechSynthesis.cancel();  // Stop speaking when component is destroyed
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


  readAloud(text: string): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();  // Stop current speech before starting a new one
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';  // Set language
    this.speechSynthesis.speak(utterance);
  }

  readIngredients(): void {
    if (this.recipe && this.recipe.ingredients) {
      console.log('reading ingredients')
      const ingredientsText = this.recipe.ingredients
        .map(ing => `${ing.name} - ${ing.quantity}`)
        .join(', ');  // Combine all ingredients into a single string
      this.readAloud(ingredientsText);
    }
  }

   currentInstructionIndex: number = 0;

  readInstructions(): void {
    if (this.recipe && this.recipe.instructions && this.currentInstructionIndex < this.recipe.instructions.length) {
      const currentInstruction = this.recipe.instructions[this.currentInstructionIndex];
      console.log('Reading instruction:', currentInstruction);
      this.readAloud(`${currentInstruction.step}: ${currentInstruction.description}`);
      this.currentInstructionIndex++;  // Move to the next instruction
    } else {
      console.log('No more instructions or invalid index');
      this.speechSynthesis.speak(new SpeechSynthesisUtterance('All steps have been read.'));
      this.currentInstructionIndex = 0;  // Reset index or handle completion
    }
  }

  // TTS for all steps  
  // readInstructions(): void {
  //   if (this.recipe && this.recipe.instructions && this.currentInstructionIndex < this.recipe.instructions.length) {
  //     const currentInstruction = this.recipe.instructions[this.currentInstructionIndex];
  //     console.log('Reading instruction:', currentInstruction);
  //     const utterance = new SpeechSynthesisUtterance(`${currentInstruction.step}: ${currentInstruction.description}`);
  //     utterance.lang = 'en-US';  // Ensure the language setting is consistent
  
  //     utterance.onend = () => {
  //       console.log('Finished reading the current instruction');
  //       this.currentInstructionIndex++;  // Move to the next instruction
  //       this.readInstructions();  // Recursively call to read the next instruction
  //     };
  
  //     this.speechSynthesis.speak(utterance);
  //   } else {
  //     console.log('No more instructions or invalid index');
  //     this.speechSynthesis.speak(new SpeechSynthesisUtterance('All steps have been read.'));
  //     this.currentInstructionIndex = 0;  // Reset index or handle completion
  //   }
  // }
  

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
