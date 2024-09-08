import { StatusCodes } from "http-status-codes";

export class APIError extends Error {
  public msg: string;
  public statusCode: StatusCodes;
  constructor(msg: string, statusCode: StatusCodes) {
    super(msg);
    this.msg = msg;
    this.statusCode = statusCode;
  }
}

export class InvalidParamError extends APIError {
  constructor(param: string) {
    const msg = `Invalid ${param}`;
    super(msg, StatusCodes.BAD_REQUEST);
  }
}

export class UnknownError extends APIError {
  constructor() {
    const msg = `Unknown Error`;
    super(msg, StatusCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends APIError {
  constructor(obj: string) {
    const msg = `${obj} not found`;
    super(msg, StatusCodes.NOT_FOUND);
  }
}

export class DuplicatedError extends APIError {
  constructor(obj: string) {
    const msg = `${obj} already exists`;
    super(msg, StatusCodes.CONFLICT);
  }
}
