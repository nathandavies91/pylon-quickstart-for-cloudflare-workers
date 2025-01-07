import { app } from "@getcronit/pylon";

import { ThingService } from "./services";

export const graphql = {
  Query: {
    thing: ThingService.getById,
    things: ThingService.getAll,
  },
  Mutation: {
    addThing: ThingService.add,
    deleteThing: ThingService.delete,
    updateThing: ThingService.update,
  },
};

export default app;