import { Router } from "express";
import { ingredienteController } from "../controllers/index.js";

const ingredientesRouter = Router();

// GET /ingredientes
ingredientesRouter.get("/", ingredienteController.getAll);

// GET /ingredientes/:id
ingredientesRouter.get("/:id", ingredienteController.getOne);

// POST /ingredientes
ingredientesRouter.post("/", ingredienteController.create);

export default ingredientesRouter;
