import { PrismaClient, reporte } from "../generated/prisma/client.js";
import {
  IReporteRepository,
  QuequeConIngredientes,
} from "../interfaces/reporte.repository.js";
import { CreateReporte, UpdateReporte } from "../models/reportes.js";

export class ReporteRepository implements IReporteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // =========================
  // Create
  // =========================
  async create(data: CreateReporte): Promise<reporte> {
    return this.prisma.reporte.create({
      data,
    });
  }

  // =========================
  // Update
  // =========================
  async update(id: number, data: UpdateReporte): Promise<reporte> {
    return this.prisma.reporte.update({
      where: { id },
      data,
    });
  }

  // =========================
  // Delete
  // =========================
  async delete(id: number): Promise<void> {
    await this.prisma.reporte.delete({
      where: { id },
    });
  }

  // =========================
  // Find by ID
  // =========================
  async findOne(id: number): Promise<reporte | null> {
    return this.prisma.reporte.findUnique({
      where: { id },
    });
  }

  // =========================
  // Find all
  // =========================
  async findAll(): Promise<reporte[]> {
    return this.prisma.reporte.findMany({
      orderBy: { id: "desc" },
    });
  }

  async getQueque(id: number): Promise<QuequeConIngredientes> {
    const result = await this.prisma.reporte.findUnique({
      where: { id },
      include: {
        queques: {
          include: {
            quequeingrediente: {
              include: {
                ingredientes: true,
              },
            },
          },
        },
      },
    });

    // 🔒 Validaciones obligatorias
    if (!result) {
      throw new Error("Reporte no encontrado");
    }

    if (!result.queques) {
      throw new Error("El reporte no tiene queque asociado");
    }

    const { queques } = result;

    return {
      id: queques.id,
      nombre: queques.nombre,
      ingredientes: queques.quequeingrediente.map((qi) => ({
        id: qi.ingredientes.id,
        nombre: qi.ingredientes.nombre,
        cantidad: qi.cantidad,
        costo: qi.ingredientes.costoUnitario,
      })),
    };
  }
}
