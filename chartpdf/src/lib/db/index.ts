import {neon, neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";

//to cache the connection sent
neonConfig.fetchConnectionCache = true;

if(!process.env.DATABASE_URL){
    throw new Error("Missing DATABASE_URL");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);