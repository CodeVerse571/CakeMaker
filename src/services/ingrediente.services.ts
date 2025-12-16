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
    // aquí va lógica de negocio
    if (data.cantidadTotal < 0) {
      throw new Error("Cantidad no puede ser negativa");
    }

    return this.ingredienteRepo.create(data);
  }

  update(id: number, data: UpdateIngredientes) {
    return this.ingredienteRepo.update(id, data);
  }

  delete(id: number) {
    return this.ingredienteRepo.delete(id);
  }
}
