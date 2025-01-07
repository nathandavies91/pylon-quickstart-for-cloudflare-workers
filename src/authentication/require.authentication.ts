import { createDecorator } from "@getcronit/pylon";

import { AuthorizationException } from "../exceptions";

export const requireAuthentication = createDecorator(async () => {
  const isValid = true;

  if (isValid) {
    return;
  }

  throw new AuthorizationException;
});