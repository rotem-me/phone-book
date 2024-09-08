import { APIError } from "../errors";

export function errorHandlerMiddleware(err, req, res, next) {
  console.log("Error during request", {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query,
    error: err,
  });

  if (err instanceof APIError) {
    res.status(err.statusCode).json({ error: err.msg }).end();
    return;
  }

  res.status(500).json({ error: "Internal Server Error" }).end();
}
