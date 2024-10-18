import { db } from "../db"; // Adjust the import path as necessary

// GET method to retrieve lent records based on search term
export async function GET(req) {
  const connection = await db();
  const { search } = Object.fromEntries(new URL(req.url).searchParams); // Get the search parameter from the query

  try {
    let query = "SELECT * FROM lent";
    const params = [];

    if (search) {
      // Prepare the SQL query to search across multiple fields
      query +=
        " WHERE ID LIKE ? OR usn LIKE ? OR bookID LIKE ? OR Lent LIKE ? OR collect LIKE ?";
      const searchTerm = `%${search}%`; // Add wildcards for LIKE search
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const [rows] = await connection.query(query, params);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// POST method to insert a new lent record
export async function POST(req) {
  const connection = await db();
  const newLend = await req.json(); // Parse the incoming JSON

  try {
    const { usn, bookID, lent, collect } = newLend; // Destructure the incoming data

    // Validate required fields
    if (!usn || !bookID || !lent) {
      return new Response(
        JSON.stringify({
          message: "USN, Book ID, and Lent date are required.",
        }),
        { status: 400 }
      );
    }

    // Insert into the lent table
    const [result] = await connection.query(
      "INSERT INTO lent (usn, bookID, Lent, collect) VALUES (?, ?, ?, ?)",
      [usn, bookID, lent, collect || null] // 'collect' can be null if not provided
    );

    return new Response(
      JSON.stringify({
        message: "Book lent successfully!",
        id: result.insertId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(req) {
  const connection = await db();
  const { id } = Object.fromEntries(new URL(req.url).searchParams); // Get the ID from the query parameter

  try {
    // Validate ID presence
    if (!id) {
      return new Response(
        JSON.stringify({
          message: "ID is required to delete a record.",
        }),
        { status: 400 }
      );
    }

    // Execute the DELETE query
    const [result] = await connection.query("DELETE FROM lent WHERE ID = ?", [
      id,
    ]);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          message: "No record found with the given ID.",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Record deleted successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
