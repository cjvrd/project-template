import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import contactsRouter from "@/contacts-api/contacts.routes";
import { errorHandler } from "@/middleware/error-handler";
import { logger } from "@/logger";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/contacts", contactsRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
