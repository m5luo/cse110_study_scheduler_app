import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "user" table if it doesn't exist
 await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
     user_id TEXT PRIMARY KEY,
     username TEXT NOT NULL,
     password TEXT NOT NULL
   );
 `);
 // Create a "events" table if it doesn't exist
 await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      title TEXT PRIMARY KEY,
      color TEXT NOT NULL,
      startTime INTEGER NOT NULL,
      endTime INTEGER NOT NULL,
      weekday TEXT NOT NULL
    );
  `);
 return db;
};

export default initDB;