import { createDecorator } from "@getcronit/pylon";

import { PaginationException } from "../exceptions";

export const paginationValidator = createDecorator(async (limit?: number, offset?: number) => {
  if (limit && (limit < 1 || limit > 100)) {
    throw new PaginationException("'limit' should be a positive number between 1 and 100");
  }

  if (offset && offset < 1) {
    throw new PaginationException("'offset' should be a positive number");
  }
});