import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Creating a pool is better
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

// Using pool for drizzle
export const db = drizzle({ client: pool })
