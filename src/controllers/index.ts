import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv";

import { IngredienteRepository } from "../repositories/Ingrediente.repository.js";
import { IngredienteService } from "../services/ingrediente.services.js";
import { IngredienteController } from "../controllers/ingredientes.controller.js";
import { QuequeRepository } from "../repositories/queque.repository.js";
import { QuequeService } from "../services/queques.services.js";
import { QuequeController } from "./queques.controller.js";
import logger from "../config/logger.js";

// Inicialización de Prisma con manejo de errores
let prisma: PrismaClient;

try {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    connectionLimit: 10,
    allowPublicKeyRetrieval: true,
  });

  prisma = new PrismaClient({ adapter });

  // Probar la conexión al iniciar
  await prisma.$connect();

  logger.info("Conexión a la base de datos exitosa");

  // Console log para debug
  console.log("✅ Prisma inicializado correctamente");
  console.log("Host:", process.env.DATABASE_HOST);
  console.log("Usuario:", process.env.DATABASE_USER);
  console.log("Nombre DB:", process.env.DATABASE_NAME);
} catch (error) {
  logger.error(`Error al inicializar Prisma: ${error}`);
  console.error("❌ Error al inicializar Prisma:", error);
  process.exit(1); // termina la aplicación si no se puede conectar
}

// Repositorios
const ingredienteRepository = new IngredienteRepository(prisma);
const quequeRepository = new QuequeRepository(prisma);

// Servicios
const ingredienteService = new IngredienteService(ingredienteRepository);
const quequeService = new QuequeService(
  quequeRepository,
  ingredienteRepository
);

// Controladores
export const ingredienteController = new IngredienteController(
  ingredienteService
);
export const quequeController = new QuequeController(quequeService);
