import { getContext } from "@getcronit/pylon";

import { DatabaseException } from "../exceptions";

export class DatabaseService {
  protected database: D1Database;

  constructor() {
    this.database = getContext().env.DB;
  }

  async count(query: string, ...bindings: unknown[]): Promise<number> {
    const databaseResponse = await this.database.prepare(query)
      .bind(...bindings)
      .first<{ count: number }>();
    
    return databaseResponse?.count ?? 0;
  }

  async run(query: string, ...bindings: unknown[]): Promise<boolean> {
    let success = false;

    try {
      const result = await this.database.prepare(query)
        .bind(...bindings)
        .run();
      
      success = result.success;
    }
    catch (error: any) {
      throw new DatabaseException(error.message);
    }

    return success;
  }

  async selectAll<T = unknown>(query: string, ...bindings: unknown[]) {
    const { results } = await this.database.prepare(query)
      .bind(...bindings)
      .all<T>();
    
    return results;
  }

  async selectFirst<T = unknown>(query: string, ...bindings: unknown[]) {
    const result = await this.database.prepare(query)
      .bind(...bindings)
      .first<T>();
    
    return result;
  }
}