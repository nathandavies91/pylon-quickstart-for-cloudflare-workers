import { requireAuthentication } from "../authentication";
import { DatabaseException } from "../exceptions";
import { Thing } from "../models";
import deleteQuery from "../queries/things/delete.query.txt";
import insertQuery from "../queries/things/insert.query.txt";
import selectAllQuery from "../queries/things/select-all.query.txt";
import selectByIdQuery from "../queries/things/select-by-id.query.txt";
import selectCountQuery from "../queries/things/select-count.query.txt";
import updateQuery from "../queries/things/update.query.txt";
import { asPaginatedResponse } from "../utilities";
import { paginationValidator } from "../validators";
import { DatabaseService } from "./database.service";

type ThingRequest = Pick<Thing, "title">;

export class ThingService {
  @requireAuthentication
  static async add(thing: ThingRequest) {
    const success = await (new DatabaseService).run(insertQuery, thing.title);

    if (!success) {
      throw new DatabaseException("Unable to add thing");
    }

    return thing;
  }

  @requireAuthentication
  static async delete(id: string) {
    let success = await (new DatabaseService).run(deleteQuery, id);

    if (!success) {
      throw new DatabaseException("Unable to delete thing");
    }
  }
  
  @paginationValidator
  static async getAll(limit?: number, offset?: number) {
    limit ??= 24;
    offset ??= 0;

    const results = await (new DatabaseService).selectAll<Thing>(selectAllQuery, limit, offset);
    const totalCount = await ThingService.getTotalCount();
    
    return asPaginatedResponse(results, totalCount);
  }

  static async getById(id: string) {
    return await (new DatabaseService).selectFirst<Thing>(selectByIdQuery, id);
  }

  static async getTotalCount(): Promise<number> {
    return await (new DatabaseService).count(selectCountQuery);
  }

  @requireAuthentication
  static async update(id: string, thing: ThingRequest) {
    let success = await (new DatabaseService).run(updateQuery, id, thing.title);

    if (!success) {
      throw new DatabaseException("Unable to update thing");
    }

    return await ThingService.getById(id);
  }
}