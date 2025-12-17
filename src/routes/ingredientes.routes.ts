import { Router } from "express";
import { ingredienteController } from "../controllers/index.js";
import logger from "../config/logger.js";

const ingredientesRouter = Router();

// GET /ingredientes
ingredientesRouter.get("/", ingredienteController.getAll);

// GET /ingredientes/:id
ingredientesRouter.get("/:id", ingredienteController.getOne);

// POST /ingredientes
ingredientesRouter.post("/", async (req, res) => {
  try {
    const result = await ingredienteController.create(req, res);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al crear ingrediente" });
  }
});
export default ingredientesRouter;
