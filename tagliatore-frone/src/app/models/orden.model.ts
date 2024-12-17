export interface Platillo {
  dishId?: {
    _id: string;
    name: string;
  };
  name: string;
  quantity: number;
}

export interface Orden {
  _id?: string;
  tableId: string;
  dishes: Platillo[];
  status: string;
}
