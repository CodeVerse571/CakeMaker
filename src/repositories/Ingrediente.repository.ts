import { IIngredienteRepository } from "../interfaces/Ingrediente.repository.js";
import { ingredientes, PrismaClient } from "../generated/prisma/client.js"; // ✅
import {
  CreateIngredientes,
  UpdateIngredientes,
} from "../models/ingredientes.js";

export class IngredienteRepository implements IIngredienteRepository {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.ingredientes.findMany();
  }

  findOne(id: number) {
    return this.prisma.ingredientes.findUnique({ where: { id } });
  }

  create(data: CreateIngredientes) {
    return this.prisma.ingredientes.create({ data });
  }

  update(id: number, data: UpdateIngredientes) {
    return this.prisma.ingredientes.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.prisma.ingredientes.delete({ where: { id } });
  }

  async incrementStock(ingredienteID: number, cantidad: number): Promise<void> {
    await this.prisma.ingredientes.update({
      where: { id: ingredienteID },
      data: {
        cantidadTotal: {
          increment: cantidad,
        },
      },
    });
  }
}
