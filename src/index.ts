import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import ingredientesRouter from "./routes/ingredientes.routes.js";
import quequeRouter from "./routes/queque.routes.js";

const app = express();

app.use(express.json());

app.use("/ingredientes", ingredientesRouter);
app.use("/queques", quequeRouter);

app.use(errorHandler);

export default app;
