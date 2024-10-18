import { db } from "../db";

export async function GET(req) {
  const connection = await db();
  const { search } = Object.fromEntries(new URL(req.url).searchParams); // Get the search parameter from the query

  try {
    // If no search term is provided, return all books
    if (!search) {
      const [rows] = await connection.query("SELECT * FROM books");
      return new Response(JSON.stringify(rows), { status: 200 });
    }

    // If a search term is provided, search by title or author
    const [rows] = await connection.query(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `%${search}%`]
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(req) {
  const connection = await db();
  const newBook = await req.json();
  console.log(newBook);

  try {
    const { title, author, language, stock } = newBook; // Destructure the incoming data
    const [result] = await connection.query(
      "INSERT INTO books (title, author, language, stock) VALUES (?, ?, ?, ?)",
      [title, author, language, stock]
    );

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// Update book details
export async function PUT(req) {
  const connection = await db();
  const updatedBook = await req.json();
  const { ID, title, author, language, stock } = updatedBook;

  try {
    const [result] = await connection.query(
      "UPDATE books SET title = ?, author = ?, language = ?, stock = ? WHERE ID = ?",
      [title, author, language, stock, ID]
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// Delete a book by ID
export async function DELETE(req) {
  const connection = await db();
  const { ID } = await req.json();

  try {
    const [result] = await connection.query("DELETE FROM books WHERE ID = ?", [
      ID,
    ]);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
