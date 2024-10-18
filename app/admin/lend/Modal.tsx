import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setMemberUSN: (value: string) => void;
  setBookID: (value: string) => void;
  children: React.ReactNode;
}

interface Member {
  USN: string;
  name: string;
  emailID: string;
  DOB?: string; // Optional if it's not always present
  gender?: string; // Optional if it's not always present
}

interface Book {
  title: string;
  author: string;
  ID: string; // Add any other fields as necessary
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  setMemberUSN,
  setBookID,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const fetchMembers = async (searchTerm = "") => {
    try {
      const query = `?search=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(`/api/members${query}`);
      const data = await response.json();

      if (response.ok) {
        setMembers(data); // Update state with members data
        console.log("Fetched Members:", data); // Log results to the browser console
      } else {
        console.error("Error fetching members:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchBooks = async (searchTerm = "") => {
    setBooks([]);
    try {
      const query = `?search=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(`/api/books${query}`);
      const data = await response.json();

      if (response.ok) {
        setBooks(() => data);
        console.log("Fetched Books:", data);
      } else {
        console.error("Error fetching books:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSearch = async () => {
    // Clear previous search results
    if (title === "Borrower") {
      setMembers([]);
      if (searchInput) {
        await fetchMembers(searchInput);
      }
    } else if (title === "Book") {
      setBooks([]);
      if (searchInput) {
        await fetchBooks(searchInput);
      }
    }
  };

  const setMemberDetails = (USN = "") => {
    setMemberUSN(USN);
  };

  const setBookDetails = (ID = "") => {
    setBookID(ID);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button className="text-black" onClick={onClose}>
            X
          </button>
        </div>

        {title === "Borrower" && (
          <div>
            <input
              type="text"
              placeholder="Enter Name, USN, or Email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />
            <button
              onClick={handleSearch}
              disabled={!searchInput}
              className={`p-2 w-full text-white rounded-lg ${
                searchInput ? "bg-black/70" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Search
            </button>
          </div>
        )}
        {title === "Book" && (
          <div>
            <input
              type="text"
              placeholder="Enter Book Name or Author Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />
            <button
              onClick={handleSearch}
              disabled={!searchInput}
              className={`p-2 w-full text-white rounded-lg ${
                searchInput ? "bg-black/70" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Search Book
            </button>
          </div>
        )}

        {/* Display Results for Borrower */}
        {title === "Borrower" && members.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-black">Search Results:</h3>
            <ul className="list-disc pl-5 text-black">
              {members.map((member) => (
                <li
                  key={member.USN}
                  className="hover:bg-black hover:text-white"
                  onClick={() => setMemberDetails(member.USN)}
                >
                  {member.name} - {member.emailID} - {member.USN}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          title === "Borrower" &&
          members.length === 0 &&
          searchInput && (
            <div className="text-black">0 Results for Borrower</div>
          )
        )}

        {/* Display Results for Book */}
        {title === "Book" && books.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-black">Search Results:</h3>
            <ul className="list-disc pl-5 text-black">
              {books.map((book) => (
                <li
                  className="hover:bg-black hover:text-white"
                  onClick={() => setBookDetails(book.ID)}
                >
                  {book.title} - {book.author}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          title === "Book" &&
          books.length === 0 &&
          searchInput && <div className="text-black">0 Results for Book</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
