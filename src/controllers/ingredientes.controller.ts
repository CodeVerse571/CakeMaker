// controllers/IngredienteController.ts
import { Request, Response } from "express";
import { IngredienteService } from "../services/ingrediente.services.js";

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
    const ingrediente = await this.ingredienteService.create(req.body);

    res.status(201).json({
      message: "Ingrediente creado correctamente",
      data: ingrediente,
    });
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload = req.body;

    const ingrediente = await this.ingredienteService.update(id, payload);

    res.json({
      message: "Ingrediente actualizado correctamente",
      data: ingrediente,
    });
  };
}
