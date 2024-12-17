export interface Platillo {
  id?: string; // ID del platillo (puede ser opcional para crear)
  name: string;
  ingredients: string;
  price: number;
  image: string;
}
