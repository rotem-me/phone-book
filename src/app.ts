import express, { Express } from "express";
import cors from "cors";
import { HealthCheckRouter } from "./routers/health-check";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { ALLOWED_METHODS, ALLOWED_ORIGIN } from "./settings";
import { ContactsRouter } from "./routers/contacts";

export const app: Express = express();

app.use(
  cors<express.Request>({
    origin: ALLOWED_ORIGIN,
    methods: ALLOWED_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.get(`/health-check`, HealthCheckRouter);
app.use(`/api/contacts`, ContactsRouter);
app.use(errorHandlerMiddleware);
