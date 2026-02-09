import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import contactsRouter from "./contacts-api/contacts.routes";

const app = express();
const rawPort = Number(process.env.PORT ?? 3000);
const port = Number.isFinite(rawPort) ? rawPort : 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/contacts", contactsRouter);

app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  },
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
