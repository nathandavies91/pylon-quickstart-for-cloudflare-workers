import { ServiceError } from "@getcronit/pylon";

import { StatusCode } from "../enums";

export class DatabaseException extends ServiceError {
  constructor(errorMessage: string) {
    let statusCode = StatusCode.ServiceUnavailable;

    if (errorMessage?.includes("SQLITE_CONSTRAINT")) {
      errorMessage = "An item already exists with that identifier";
      statusCode = StatusCode.Conflict;
    }

    super(errorMessage, {
      code: StatusCode[statusCode],
      statusCode,
    });
  }
}