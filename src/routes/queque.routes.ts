// routes/queque.routes.ts
import { Router } from "express";
import { quequeController } from "../controllers/index.js";

const quequeRouter = Router();

// 🔹 CRUD Básico
quequeRouter.get("/", quequeController.getAll);
quequeRouter.get("/:id", quequeController.getOne);
quequeRouter.post("/", quequeController.create);
quequeRouter.put("/:id", quequeController.update);
quequeRouter.delete("/:id", quequeController.delete);

// 🔹 Relación con Ingredientes
quequeRouter.post("/:id/ingredientes", quequeController.addIngredientes);

quequeRouter.put("/:id/ingredientes", quequeController.replaceIngredientes);

quequeRouter.get("/:id/ingredientes", quequeController.getIngredients);

export default quequeRouter;
