export interface Recipe {
  _id: string,
  title: string;
  ingredients: string;
  media: Media[];
  instructions: Instruction[];
  category: string;
  createdAt: Date;
}

export interface Instruction {
  step: string;
  description: string;
}

export interface Media {
  url: string;
  type: string;
}
