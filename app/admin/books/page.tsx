"use client";
import React, { useEffect, useState } from "react";
import CustumInput from "../CustumInput";
import RenderBookCard from "./renderBookCard";
import "../scroll.css";
import { title } from "process";

interface Book {
  ID: number;
  title: string;
  author: string;
  language: string;
  stock: number;
}

const Books = () => {
  const [selected, setSelected] = useState("add");
  const [bookTitle, setBookTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [language, setLanguage] = useState("");
  const [stock, setStock] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const fetchAllBooks = async (search = "") => {
    const response = await fetch(`/api/books?search=${search}`);
    if (!response.ok) {
      console.log("error fetching books");
    }
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const clearForm = () => {
    setBookTitle("");
    setAuthors("");
    setLanguage("");
    setStock("");
    setSearchTerm(""); // Clear search
    setIsSearchTriggered(false); // Reset search state
    fetchAllBooks(); // Reload the list
  };

  const handlePost = async () => {
    const newBook = {
      title: bookTitle,
      author: authors,
      language,
      stock: Number(stock),
    };

    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      console.log("Error adding book");
    } else {
      clearForm();
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/books`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Pass book ID for deletion
    });

    if (response.ok) {
      console.log("Book deleted successfully");
      fetchAllBooks(); // Reload the book list after deletion
    } else {
      console.log("Error deleting book");
    }
  };

  const handleUpdate = async () => {
    const updatedBook = {
      ID: books.find((book) => book.title === bookTitle)?.ID, // Get the book's ID
      title: bookTitle,
      author: authors,
      language,
      stock: Number(stock),
    };

    const response = await fetch(`/api/books`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (response.ok) {
      console.log("Book updated successfully");
      clearForm();
    } else {
      console.log("Error updating book");
    }
  };

  const handleSearch = () => {
    // Check both fields and set search term based on user input
    if (bookTitle.trim() || authors.trim()) {
      setSearchTerm(bookTitle || authors); // Set search term based on available input
      fetchAllBooks(bookTitle || authors); // Fetch books with the search term
      setIsSearchTriggered(true); // Indicate that a search has been triggered
    }
  };

  const setBookValues = (book: Book) => {
    if (selected !== "add") {
      setBookTitle(book.title);
      setAuthors(book.author);
      setLanguage(book.language);
      setStock(String(book.stock));
    }
  };

  return (
    <div className="flex flex-col flex-1 rounded-3xl m-10 bg-white/10">
      <div className="flex flex-1 justify-evenly bg-white/20 rounded-t-3xl text-center cursor-pointer">
        <div
          className={`${
            selected === "add" && "bg-black/50"
          } flex-1 hover:bg-black/50 p-3`}
          onClick={() => {
            setSelected("add");
            clearForm();
          }}
        >
          Add New Book
        </div>
        <div
          className={`${
            selected === "update" && "bg-black/50"
          } flex-1 hover:bg-black/20 p-3`}
          onClick={() => {
            setSelected("update");
          }}
        >
          Update/Delete
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex flex-shrink-0 w-1/2 p-3 h-full">
          <div className="flex flex-1 p-10 flex-col justify-evenly h-full">
            {selected !== "add" && (
              <span className="text-sm text-center -mb-5">
                Enter Title or Author Name to Search
              </span>
            )}
            <CustumInput
              inputName="Book Title"
              isDisabled={false}
              setValue={setBookTitle}
              value={bookTitle}
            />
            <CustumInput
              inputName="Author Name"
              isDisabled={false}
              setValue={setAuthors}
              value={authors}
            />
            <CustumInput
              inputName="Language"
              isDisabled={false}
              setValue={setLanguage}
              value={language}
            />
            <CustumInput
              inputName="Stock"
              isDisabled={false}
              setValue={setStock}
              value={stock}
            />
            {selected === "add" ? (
              <div
                className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-3 text-center rounded-md hover:border border-white/15 border-2 cursor-pointer"
                onClick={handlePost}
              >
                ADD NEW BOOK
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-evenly w-full">
                  <div
                    className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-[10px] text-center rounded-md hover:border border-white/15 border-2 cursor-pointer mb-5 w-full"
                    onClick={handleSearch}
                  >
                    Search BOOK
                  </div>
                </div>
                {isSearchTriggered && (
                  <div className="flex justify-evenly text-white/50 text-center">
                    <div
                      className="bg-white/10 hover:bg-red-400 font-black w-2/5 p-[10px]  border-white/15 border-2 rounded-lg"
                      onClick={() =>
                        handleDelete(
                          books.find((book) => book.title === bookTitle)?.ID ||
                            0
                        )
                      }
                    >
                      Delete
                    </div>
                    <div
                      className="bg-white/10 w-2/5 p-[10px] hover:bg-black/50 border-white/15 border-2 rounded-lg"
                      onClick={handleUpdate}
                    >
                      Update
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-shrink w-1/2  bg-white/10 m-2 me-4 mb-4 mt-10 rounded-2xl ">
          <div className="text-white/80 bg-white/15 p-3 rounded-t-2xl ">
            {selected === "add" ? "All Books" : "Search Results"}
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden ">
            {books.map((book) => (
              <div key={book.ID} onClick={() => setBookValues(book)}>
                <RenderBookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
