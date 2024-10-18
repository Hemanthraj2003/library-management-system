"use client"; // Ensure this is a client component
import React from "react";
import jsPDF from "jspdf";

interface Book {
  ID: number;
  title: string;
  author: string;
  language: string;
  stock: number;
}

interface Member {
  id: number;
  name: string;
}

interface LentBook {
  id: number;
  bookTitle: string;
  memberName: string;
}

const Reports: React.FC = () => {
  const fetchAndGeneratePDF = async (type: "books" | "members" | "lent") => {
    let apiUrl: string;

    switch (type) {
      case "books":
        apiUrl = "/api/books";
        break;
      case "members":
        apiUrl = "/api/members";
        break;
      case "lent":
        apiUrl = "/api/lend";
        break;
      default:
        return; // Handle unexpected type
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Book[] | Member[] | LentBook[] = await response.json();

      const doc = new jsPDF();
      doc.setFontSize(12);
      let y = 10; // Starting y position

      // Add Title
      doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 10, y);
      y += 10;

      // Add headers and data based on type
      if (type === "books") {
        doc.text("ID", 10, y);
        doc.text("Title", 40, y);
        doc.text("Author", 90, y);
        doc.text("Language", 140, y);
        doc.text("Stock", 190, y);
        y += 10;

        (data as Book[]).forEach((book) => {
          doc.text(String(book.ID), 10, y);
          doc.text(book.title, 40, y);
          doc.text(book.author, 90, y);
          doc.text(book.language, 140, y);
          doc.text(String(book.stock), 190, y);
          y += 10;
        });
      } else if (type === "members") {
        doc.text("Member ID", 10, y);
        doc.text("Member Name", 40, y);
        y += 10;

        (data as Member[]).forEach((member) => {
          doc.text(String(member.id), 10, y);
          doc.text(member.name, 40, y);
          y += 10;
        });
      } else if (type === "lent") {
        doc.text("Lent ID", 10, y);
        doc.text("Book Title", 40, y);
        doc.text("Member Name", 90, y);
        y += 10;

        (data as LentBook[]).forEach((lent) => {
          doc.text(String(lent.id), 10, y);
          doc.text(lent.bookTitle, 40, y);
          doc.text(lent.memberName, 90, y);
          y += 10;
        });
      }

      doc.save(`${type}_report.pdf`);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="flex flex-col space-y-4 h-50 w-30">
        <h2 className="text-white text-2xl text-center mb-4">Reports</h2>
        <button
          className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
          onClick={() => fetchAndGeneratePDF("books")}
        >
          Download Book Report
        </button>
        <button
          className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
          onClick={() => fetchAndGeneratePDF("members")}
        >
          Download Member Report
        </button>
        <button
          className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
          onClick={() => fetchAndGeneratePDF("lent")}
        >
          Download Lent Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
