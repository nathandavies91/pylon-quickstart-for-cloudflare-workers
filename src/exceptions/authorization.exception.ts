import { ServiceError } from "@getcronit/pylon";

import { StatusCode } from "../enums";

export class AuthorizationException extends ServiceError {
  constructor() {
    super(StatusCode[StatusCode.Unauthorized], {
      code: StatusCode[StatusCode.Unauthorized],
      statusCode: StatusCode.Unauthorized,
    });
  }
}