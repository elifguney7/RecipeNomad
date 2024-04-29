export interface Recipe {
  _id: string,
  title: string;
  ingredients: Ingredients[];
  media: Media[];
  instructions: Instruction[];
  category: string;
  createdAt: Date;
}

export interface Instruction {
  step: string;
  description: string;
}

export interface Ingredients {
  name: string;
  quantity: string;
}

export interface Media {
  url: string;
  type: string;
}
