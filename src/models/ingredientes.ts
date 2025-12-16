export type CreateIngredientes = {
  id: number;
  nombre: string;
  costoUnitario: number;
  cantidadTotal: number;
  createdAt: Date;
};

export type UpdateIngredientes = {
  id: number;
  nombre: string;
  costoUnitario: number;
  cantidadTotal: number;

  createdAt: Date;
};
