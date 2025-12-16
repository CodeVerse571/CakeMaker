// services/IngredienteService.ts
import { IIngredienteRepository } from "../interfaces/Ingrediente.repository.js";
import { IQuequeRepository } from "../interfaces/queque.repository.js";
import {
  CreateIngredientes,
  UpdateIngredientes,
} from "../models/ingredientes.js";
import {
  CreateQueques,
  QuequeIngredienteInput,
  UpdateQueques,
} from "../models/queques.js";

export class QuequeService {
  constructor(
    private readonly quequeRepo: IQuequeRepository,
    private readonly ingrediRepo: IIngredienteRepository
  ) {}

  getAll() {
    return this.quequeRepo.findAll();
  }

  getById(id: number) {
    return this.quequeRepo.findOne(id);
  }

  create(data: CreateQueques) {
    return this.quequeRepo.create(data);
  }

  update(id: number, data: UpdateQueques) {
    return this.quequeRepo.update(id, data);
  }

  delete(id: number) {
    return this.quequeRepo.delete(id);
  }

  async addIngredientes(
    quequeId: number,
    ingredientes: QuequeIngredienteInput[]
  ): Promise<void> {
    const ingredientesFinales: QuequeIngredienteInput[] = await Promise.all(
      ingredientes.map(async ({ ingredienteId, cantidad }) => {
        const ingredienteDB = await this.ingrediRepo.findOne(ingredienteId);

        return {
          ingredienteId,
          cantidad: Math.max(ingredienteDB!.cantidadTotal - cantidad, 0),
        };
      })
    );

    await this.quequeRepo.addIngredientes(quequeId, ingredientesFinales);
  }

  async replaceIngredientes(
    quequeId: number,
    ingredientes: QuequeIngredienteInput[]
  ): Promise<void> {
    const ingredienteIDs = ingredientes.map((ing) => ing.ingredienteId);

    const ingredientesActuales = await this.quequeRepo.getIngredientes(
      quequeId,
      ingredienteIDs
    );

    await Promise.all(
      ingredientesActuales.map((ing) =>
        this.ingrediRepo.incrementStock(ing.ingredienteId, ing.cantidad)
      )
    );

    // 3️⃣ Reemplazar ingredientes
    await this.quequeRepo.replaceIngredientes(quequeId, ingredientes);
  }
}
