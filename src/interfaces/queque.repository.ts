import { RepositoryBase } from "../interfaces/Repository.js";
import { quequeingrediente, queques } from "../generated/prisma/client.js";
import {
  CreateQueques,
  QuequeIngredienteInput,
  UpdateQueques,
} from "../models/queques.js";

/**
 * Repositorio de Queques
 * Maneja CRUD + relaciones con ingredientes
 */
export interface IQuequeRepository extends RepositoryBase<
  queques,
  CreateQueques,
  UpdateQueques
> {
  addIngredientes(
    quequeId: number,
    ingredientes: QuequeIngredienteInput[]
  ): Promise<void>;

  removeIngrediente(quequeId: number, ingredienteId: number): Promise<void>;

  replaceIngredientes(
    quequeId: number,
    ingredientes: QuequeIngredienteInput[]
  ): Promise<void>;

  getIngredientes(
    quequeid: Number,
    ingredientes: number[]
  ): Promise<quequeingrediente[]>;
}
