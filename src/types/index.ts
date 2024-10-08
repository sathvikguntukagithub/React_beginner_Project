export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  image: string;
  rating: number;
}

export interface Data {
  recipes: Recipe[];
}
export type RecipeFetchState = {
  data: Recipe | null;
  loading: boolean;
  error: Error | null;
};

export type MainConcepts = {
  id: number;
  name: string;
  mobile?: number;
  city: string;
};
