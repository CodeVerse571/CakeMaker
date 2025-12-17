import winston from "winston";

// Crear un logger
const logger = winston.createLogger({
  level: "info", // nivel mínimo de log (error, warn, info, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.timestamp(), // agrega fecha y hora
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // log a consola
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // errores a archivo
    new winston.transports.File({ filename: "logs/combined.log" }), // todo a archivo
  ],
});

export default logger;
