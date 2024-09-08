import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { version } from "../../package.json";

export function HealthCheckRouter(_, res: Response) {
  res.status(StatusCodes.OK).json({ ok: true, version }).end();
}
