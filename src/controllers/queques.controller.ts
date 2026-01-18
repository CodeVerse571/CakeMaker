// controllers/QuequeController.ts
import { Request, Response } from "express";
import { QuequeIngredienteInput } from "../models/queques.js";
import { QuequeService } from "../services/queques.services.js";

export class QuequeController {
  constructor(private readonly quequeService: QuequeService) {}

  getAll = async (_req: Request, res: Response) => {
    const queques = await this.quequeService.getAll();
    res.json(queques);
  };

  getOne = async (_req: Request, res: Response) => {
    const id = Number(_req.params.id);
    const queque = await this.quequeService.getById(id);
    res.json(queque);
  };

  create = async (req: Request, res: Response) => {
    const queque = await this.quequeService.create(req.body);

    res.status(201).json({
      message: "Queque creado correctamente",
      data: queque,
    });
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const queque = await this.quequeService.update(id, req.body);

    res.json({
      message: "Queque actualizado correctamente",
      data: queque,
    });
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.quequeService.delete(id);
    res.status(204).send();
  };

  addIngredientes = async (req: Request, res: Response) => {
    const quequeId = Number(req.params.id);
    const ingredientes: QuequeIngredienteInput[] = req.body;
    await this.quequeService.addIngredientes(quequeId, ingredientes);
    res.status(201).json({ message: "Ingredientes agregados" });
  };

  getIngredients = async (req: Request, res: Response) => {
    const quequeId = Number(req.params.id);

    const ingredientes = await this.quequeService.getIngredientes(quequeId);

    return res.status(200).json(ingredientes);
  };

  removeIngredient = async (req: Request, res: Response) => {
    const quequeId = Number(req.params.id);
    const ingredientId = Number(req.params.ingredientId);

    await this.quequeService.removeIngredient(quequeId, ingredientId);

    res.status(200).json({
      message: "Ingrediente eliminado correctamente",
    });
  };
}
