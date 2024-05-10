import 'dotenv/config';

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import {db, conn} from "~/server/db";


await migrate(db, {migrationsFolder: './drizzle/migrations'})

await conn.end();