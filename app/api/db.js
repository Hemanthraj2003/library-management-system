import mysql from "mysql2/promise";

let connection;

export async function db() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "library",
    });
  }

  const [tables] = await connection.query("SHOW TABLES");
  const newTables = tables.map((table) => Object.values(table)[0]);
  console.log(newTables);

  return connection;
}
