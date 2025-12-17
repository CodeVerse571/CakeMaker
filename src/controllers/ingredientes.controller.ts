// controllers/IngredienteController.ts
import { Request, Response } from "express";
import { IngredienteService } from "../services/ingrediente.services.js";
import logger from "../config/logger.js";

export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) {}

  getAll = async (_req: Request, res: Response) => {
    const data = await this.ingredienteService.getAll();
    res.json(data);
  };

  getOne = async (_req: Request, res: Response) => {
    const id = Number(_req.params.id);
    const data = await this.ingredienteService.getById(id);
    res.json(data);
  };

  create = async (req: Request, res: Response) => {
    try {
      const ingrediente = await this.ingredienteService.create(req.body);
      res.status(201).json(ingrediente);
    } catch (error: any) {
      const errorMessage = error?.message || "Error desconocido";
      const errorType = error?.name || "GeneralError";

      res.status(500).json({
        message: "No se pudo crear el ingrediente",
        error: errorMessage,
        type: errorType,
      });
    }
  };
}
