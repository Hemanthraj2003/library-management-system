import { db } from "../db";

export async function POST(req) {
  const { username, password } = await req.json(); // extract username and password from request body

  if (!username || !password) {
    return new Response(JSON.stringify({ error: "Missing credentials" }), {
      status: 400,
    });
  }
  console.log(username, password);

  const connection = await db();

  // Query the database for the user with the provided username and password
  const [rows] = await connection.query(
    "SELECT * FROM login WHERE user = ? AND password = ?",
    [username, password]
  );

  if (rows.length > 0) {
    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid credentials" }),
      { status: 401 }
    );
  }
}
