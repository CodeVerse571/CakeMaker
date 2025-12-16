import { RepositoryBase } from "../interfaces/Repository.js";
import {
  CreateIngredientes,
  UpdateIngredientes,
} from "../models/ingredientes.js";
import { ingredientes } from "../generated/prisma/client.js"; // ✅

export interface IIngredienteRepository extends RepositoryBase<
  ingredientes,
  CreateIngredientes,
  UpdateIngredientes
> {
  incrementStock(ingredienteID: number, cantidad: number): Promise<void>;
}
