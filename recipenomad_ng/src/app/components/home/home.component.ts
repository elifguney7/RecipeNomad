import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex: number = 0;

  ngOnInit(): void {
    const slides: HTMLElement | null = document.querySelector(".categoriesSection");
    const prevButton: HTMLElement | null = document.querySelector(".prevButton");
    const nextButton: HTMLElement | null = document.querySelector(".nextButton");

    if (slides && prevButton && nextButton) {
      let currentIndex = 0;
      const categoryCount = slides.querySelectorAll('.categoriesLogos').length;
      
      const updateSlides = () => {
        slides.style.transform = `translateX(-${(currentIndex * (100 / categoryCount))}%)`;
      };

      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlides();
        }
      });

      nextButton.addEventListener("click", () => {
        if (currentIndex < categoryCount - 1) {
          currentIndex++;
          updateSlides();
        }
      });

    const recipeSlides: HTMLElement | null = document.querySelector(".recipesGrid .row");
    const prevRecipeButton: HTMLElement | null = document.querySelector(".prevButtonPrew");
    const nextRecipeButton: HTMLElement | null = document.querySelector(".nextButtonPrew");

    if (recipeSlides && prevRecipeButton && nextRecipeButton) {
        let currentRecipeIndex = 0;
        const recipeCount = recipeSlides.querySelectorAll('.card.h-100.w-25').length;
        
        const updateRecipeSlides = () => {
            recipeSlides.style.transform = `translateX(-${(currentRecipeIndex * (100 / recipeCount))}%)`;
        };

        prevRecipeButton.addEventListener("click", () => {
            if (currentRecipeIndex > 0) {
                currentRecipeIndex--;
                updateRecipeSlides();
            }
        });

        nextRecipeButton.addEventListener("click", () => {
            if (currentRecipeIndex < recipeCount - 1) {
                currentRecipeIndex++;
                updateRecipeSlides();
            }
        });
    }
  }
}
}