import { QuicSession } from "node:quic";
import {
  ingredientes,
  PrismaClient,
  quequeingrediente,
} from "../generated/prisma/client.js";
import { IQuequeRepository } from "../interfaces/queque.repository.js";
import {
  CreateQueques,
  QuequeIngredienteInput,
  UpdateQueques,
} from "../models/queques.js";
import { IngredienteConCantidad } from "../models/ingredientes.js";

export class QuequeRepository implements IQuequeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.queques.findMany();
  }

  findOne(id: number) {
    return this.prisma.queques.findUnique({ where: { id } });
  }

  create(data: CreateQueques) {
    return this.prisma.queques.create({ data });
  }

  update(id: number, data: UpdateQueques) {
    return this.prisma.queques.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.queques.delete({ where: { id } });
  }

  async addIngredientes(
    quequeId: number,
    ingredientes: QuequeIngredienteInput[]
  ): Promise<void> {
    await this.prisma.quequeingrediente.createMany({
      data: ingredientes.map((i) => ({
        quequeId,
        ingredienteId: i.id,
        cantidad: i.cantidad,
      })),
    });
  }

  async removeIngrediente(
    quequeId: number,
    ingredienteId: number
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // 3️⃣ Eliminar relación
      await tx.quequeingrediente.delete({
        where: {
          quequeId_ingredienteId: {
            quequeId,
            ingredienteId,
          },
        },
      });
    });
  }

  async getIngredientes(
    quequeId: number,
    ingredientesIds: number[]
  ): Promise<quequeingrediente[]> {
    return this.prisma.quequeingrediente.findMany({
      where: {
        AND: [{ quequeId }, { ingredienteId: { in: ingredientesIds } }],
      },
    });
  }

  async getIngrediente(
    quequeId: number,
    ingredienteId: number
  ): Promise<quequeingrediente> {
    const relacion = await this.prisma.quequeingrediente.findFirst({
      where: {
        quequeId,
        ingredienteId,
      },
    });

    if (!relacion) {
      throw new Error("Ingrediente no encontrado para este queque");
    }

    return relacion;
  }

  async findIngredientesByQuequeId(
    quequeId: number
  ): Promise<IngredienteConCantidad[]> {
    const quequeIngredientes = await this.prisma.quequeingrediente.findMany({
      where: { quequeId },
      include: {
        ingredientes: true,
      },
    });

    return quequeIngredientes.map((qi) => {
      const { cantidadTotal, ...ingredienteSinCantidadTotal } = qi.ingredientes;

      return {
        ...ingredienteSinCantidadTotal,
        cantidad: qi.cantidad,
      };
    });
  }
}
