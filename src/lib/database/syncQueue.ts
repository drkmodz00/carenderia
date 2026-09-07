import { db } from "./db.native";

export async function addToSyncQueue(
  tableName: string,
  recordId: string,
  operation: string,
) {
  await db.runAsync(
    `
    INSERT INTO sync_queue (
      table_name,
      record_id,
      operation,
      created_at
    )
    VALUES (?, ?, ?, ?)
    `,
    tableName,
    recordId,
    operation,
    new Date().toISOString(),
  );
}
