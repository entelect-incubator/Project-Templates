import pg, { QueryResultRow } from "pg";

const { Pool } = pg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow>(text: string, params: any[] = []) {
	const res = await pool.query<T>(text, params);
	return res.rows;
}
