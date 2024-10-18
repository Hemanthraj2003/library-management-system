import { db } from "../db";

export async function GET(request) {
  const connection = await db();

  // Get query parameters from the request URL
  const { search } = Object.fromEntries(new URL(request.url).searchParams);

  try {
    // If no search term is provided, return all members
    if (!search) {
      console.log("hello");

      const [rows] = await connection.query("SELECT * FROM members");
      return new Response(JSON.stringify(rows), { status: 200 });
    }

    // If a search term is provided, search by name, email, or USN
    const [rows] = await connection.query(
      `SELECT * FROM members WHERE name LIKE ? OR emailID LIKE ? OR USN LIKE ?`,
      [`%${search}%`, `%${search}%`, `%${search}%`]
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(req) {
  const connection = await db();
  const newMember = await req.json();
  try {
    const { name, USN, emailID, DOB, gender } = newMember;
    const [result] = await connection.query(
      "INSERT INTO members VALUES (?,?,?,?,?)",
      [name, USN, emailID, DOB, gender]
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
// DELETE request to delete a member by USN
export async function DELETE(req) {
  const connection = await db();
  const { usn } = await req.json(); // Get the USN from the request body

  try {
    const [result] = await connection.query(
      "DELETE FROM members WHERE USN = ?",
      [usn]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Member not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: "Member deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error deleting member" }), {
      status: 500,
    });
  }
}

// PUT request to update a member's details
export async function PUT(req) {
  const connection = await db();
  const updatedMember = await req.json(); // Get updated member data from request body
  const { name, USN, emailID, DOB, gender } = updatedMember;

  try {
    const [result] = await connection.query(
      "UPDATE members SET name = ?, emailID = ?, DOB = ?, gender = ? WHERE USN = ?",
      [name, emailID, DOB, gender, USN]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Member not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: "Member updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error updating member" }), {
      status: 500,
    });
  }
}
