import express from "express";
import cors from "cors";
import ingredientesRouter from "./routes/ingredientes.routes.js";
import quequeRouter from "./routes/queque.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

/* ========================
   Middlewares globales
======================== */
app.use(
  cors({
    origin: "http://localhost:4200", // Angular
    credentials: true,
  })
);

app.use(express.json());

/* ========================
   Rutas
======================== */
app.use("/ingredientes", ingredientesRouter);
app.use("/queques", quequeRouter);

/* ========================
   Error handler (SIEMPRE al final)
======================== */
app.use(errorHandler);

export default app;
