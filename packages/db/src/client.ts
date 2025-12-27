import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const expo = openDatabaseSync("FightFixer.db");
export const db = drizzle(expo);
