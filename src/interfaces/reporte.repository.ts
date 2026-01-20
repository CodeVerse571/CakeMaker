import { RepositoryBase } from "../interfaces/Repository.js";
import { queques, reporte } from "../generated/prisma/client.js";
import { CreateReporte, UpdateReporte } from "../models/reportes.js";
import { Decimal } from "@prisma/client/runtime/client";

export interface QuequeConIngredientes {
  id: number;
  nombre: string;
  ingredientes: {
    id: number;
    nombre: string;
    cantidad: number;
    costo: Decimal;
  }[];
}
export interface IReporteRepository extends RepositoryBase<
  reporte,
  CreateReporte,
  UpdateReporte
> {
  getQueque(id: number): Promise<QuequeConIngredientes>;
}
