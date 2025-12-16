import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { IngredienteRepository } from "../repositories/Ingrediente.repository.js";
import { IngredienteService } from "../services/ingrediente.services.js";
import { IngredienteController } from "../controllers/ingredientes.controller.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { QuequeRepository } from "../repositories/queque.repository.js";
import { QuequeService } from "../services/queques.services.js";
import { QuequeController } from "./queques.controller.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

const ingredienteRepository: IngredienteRepository = new IngredienteRepository(
  prisma
);

const quequeRepository: QuequeRepository = new QuequeRepository(prisma);

const ingredienteService = new IngredienteService(ingredienteRepository);

const quequeService = new QuequeService(
  quequeRepository,
  ingredienteRepository
);

export const ingredienteController = new IngredienteController(
  ingredienteService
);

export const quequeController = new QuequeController(quequeService);
