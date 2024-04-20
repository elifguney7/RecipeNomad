export interface Recipe {
  title: string;
  ingredients: string;
  media: Media[];
  instructions: string;
}


export interface Media {
  url: string;
  type: string;
}
