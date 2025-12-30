import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as schema from "./local-schema";

const expoDb = openDatabaseSync("fightfixer.db");
export const db = drizzle(expoDb, { schema });
