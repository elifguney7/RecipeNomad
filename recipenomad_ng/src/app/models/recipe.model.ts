export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  media: Media[];
  instructions: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Media {
  url: string;
  type: string;
}
