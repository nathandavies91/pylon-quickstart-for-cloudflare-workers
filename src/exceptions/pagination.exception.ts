import { ServiceError } from "@getcronit/pylon";

import { StatusCode } from "../enums";

export class PaginationException extends ServiceError {
  constructor(errorMessage: string) {
    super(errorMessage, {
      code: StatusCode[StatusCode.BadRequest],
      statusCode: StatusCode.BadRequest,
    });
  }
}