// services/IngredienteService.ts
import { IIngredienteRepository } from "../interfaces/Ingrediente.repository.js";
import {
  CreateIngredientes,
  UpdateIngredientes,
} from "../models/ingredientes.js";

export class IngredienteService {
  constructor(private readonly ingredienteRepo: IIngredienteRepository) {}

  getAll() {
    return this.ingredienteRepo.findAll();
  }

  getById(id: number) {
    return this.ingredienteRepo.findOne(id);
  }

  create(data: CreateIngredientes) {
    return this.ingredienteRepo.create(data);
  }

  update(id: number, data: UpdateIngredientes) {
    return this.ingredienteRepo.update(id, data);
  }

  delete(id: number) {
    return this.ingredienteRepo.delete(id);
  }
}
