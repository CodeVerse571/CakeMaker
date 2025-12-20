import { ingredientes } from "../generated/prisma/client.js";

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

export type IngredienteConCantidad = Omit<ingredientes, "cantidadTotal"> & {
  cantidad: number;
};
