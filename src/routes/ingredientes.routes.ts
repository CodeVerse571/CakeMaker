import { Router } from "express";
import { ingredienteController } from "../controllers/index.js";

const ingredientesRouter = Router();

// =========================
// Queries
// =========================

// GET /ingredientes
ingredientesRouter.get("/", ingredienteController.getAll);

// GET /ingredientes/:id
ingredientesRouter.get("/:id", ingredienteController.getOne);

// =========================
// Commands
// =========================

// POST /ingredientes
ingredientesRouter.post("/", ingredienteController.create);

// PUT /ingredientes/:id
ingredientesRouter.put("/:id", ingredienteController.update);

export default ingredientesRouter;
