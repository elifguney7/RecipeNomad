export interface Recipe {
  _id: string,
  title: string;
  ingredients: string;
  media: Media[];
  instructions: string;
  category: string;
  createdAt: Date;
}


export interface Media {
  url: string;
  type: string;
}
