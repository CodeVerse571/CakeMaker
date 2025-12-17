import { IIngredienteRepository } from "../interfaces/Ingrediente.repository.js";
import { ingredientes, PrismaClient } from "../generated/prisma/client.js"; // ✅
import {
  CreateIngredientes,
  UpdateIngredientes,
} from "../models/ingredientes.js";
import logger from "../config/logger.js";

export class IngredienteRepository implements IIngredienteRepository {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.ingredientes.findMany();
  }

  findOne(id: number) {
    return this.prisma.ingredientes.findUnique({ where: { id } });
  }
  async create(data: CreateIngredientes) {
    try {
      const ingrediente = await this.prisma.ingredientes.create({ data });
      return ingrediente;
    } catch (error) {
      throw error; // relanzar para que el controlador lo maneje
    }
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

  async decrementStock(ingredienteID: number, cantidad: number): Promise<void> {
    if (cantidad <= 0) {
      throw new Error("La cantidad a decrementar debe ser mayor a 0");
    }

    await this.prisma.ingredientes.update({
      where: { id: ingredienteID },
      data: {
        cantidadTotal: {
          decrement: cantidad,
        },
      },
    });
  }
}
