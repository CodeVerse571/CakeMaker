// routes/queque.routes.ts
import { Router } from "express";
import { quequeController } from "../controllers/index.js"; // Asegúrate de exportar quequeController desde index

const quequeRouter = Router();

// 🔹 CRUD Básico
quequeRouter.get("/", quequeController.getAll);
quequeRouter.get("/:id", quequeController.getOne);
quequeRouter.post("/", quequeController.create);
quequeRouter.put("/:id", quequeController.update);
quequeRouter.delete("/:id", quequeController.delete);

// 🔹 Relación con Ingredientes
quequeRouter.post("/:id/ingredientes", quequeController.addIngredientes); // agregar varios ingredientes

quequeRouter.put("/:id/ingredientes", quequeController.replaceIngredientes); // reemplazar todos los ingredientes

export default quequeRouter;
