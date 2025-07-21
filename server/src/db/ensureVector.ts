import { sql } from "drizzle-orm";

/* IMPORTANTE: Esse script garante que não haja bugs
ou relacionados à extensão 'vector' na hora de efetuar o deploy da aplicação
*/
export function ensureVector() {
  sql`CREATE EXTENSION IF NOT EXISTS vector`;
}
