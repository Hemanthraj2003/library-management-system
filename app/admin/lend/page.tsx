"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Assuming Modal is your modal component
import DateModal from "../DateModal";

const LendBook: React.FC = () => {
  const [memberUSN, setMemberUSN] = useState("");
  const [bookID, setBookID] = useState("");
  const [lentDate, setLentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState<string>("");
  const [lentBooks, setLentBooks] = useState<any[]>([]); // State to hold the lent books
  const [isBorrowerModalOpen, setIsBorrowerModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isReturnDate, setIsReturnDate] = useState(false);

  // Function to fetch lent books from the API
  const fetchLentBooks = async () => {
    try {
      const response = await fetch("/api/lend");
      if (!response.ok) {
        throw new Error("Failed to fetch lent books.");
      }
      const data = await response.json();
      setLentBooks(data); // Set the lent books data
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchLentBooks(); // Fetch lent books when component mounts
  }, []);

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!memberUSN || !bookID || !returnDate) {
      alert("Please enter all fields: USN, Book ID, and Return Date.");
      return; // Exit the function if validation fails
    }

    const lendData = {
      usn: memberUSN,
      bookID: bookID,
      lent: lentDate,
      collect: returnDate,
    };

    try {
      const response = await fetch("/api/lend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lendData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to lend the book.");
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // Optionally, reset the fields
      setMemberUSN("");
      setBookID("");
      setReturnDate("");
      fetchLentBooks(); // Refresh lent books after submitting
    } catch (error) {
      alert(error); // Show error message
    }
  };

  return (
    <div className="flex flex-col flex-1 m-10 p-3 bg-white/10 rounded-3xl justify-between">
      <div className="flex ps-7 pt-4">
        <div className="w-10/12">
          <div className="text-3xl text-white/70">Lend Book</div>
          <div className="flex justify-evenly">
            <div className="text-white/40 mt-3">
              <div
                className="p-2 text-white bg-black text-center m-3 rounded-lg hover:bg-black/20 cursor-pointer hover:border"
                onClick={() => setIsBorrowerModalOpen(true)}
              >
                Select borrower
              </div>
              {memberUSN && "USN: " + memberUSN}
            </div>
            <div className="text-white/40 mt-3">
              <div
                className="p-2 text-white bg-black text-center m-3 rounded-lg hover:bg-black/20 cursor-pointer hover:border"
                onClick={() => setIsBookModalOpen(true)}
              >
                Select book
              </div>
              {bookID && "BookID: " + bookID}
            </div>
            <div className="text-white/40 mt-3">
              Lending Details:
              <div className="flex flex-col gap-3">
                <div className=" text-sm">
                  <label>Lent Date:</label>
                  <input
                    type="date"
                    className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white/80"
                    value={lentDate}
                    readOnly // Make it read-only to prevent manual editing
                  />
                </div>
                <div className=" text-sm">
                  <label>Return Date:</label>
                  <input
                    type="date"
                    className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white/80"
                    value={returnDate}
                    readOnly // Make it read-only to prevent manual editing
                    onClick={() => setIsDateModalOpen(true)} // Open modal on click
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div
            className="p-4 px-7 bg-white/10 rounded-xl"
            onClick={handleSubmit}
          >
            Lend Book
          </div>
        </div>
      </div>

      <Modal
        isOpen={isBorrowerModalOpen}
        onClose={() => setIsBorrowerModalOpen(false)}
        title="Borrower"
        setMemberUSN={setMemberUSN}
        setBookID={setBookID}
      >
        {/* Borrower selection form or content goes here */}
        <p>Borrower selection modal content</p>
      </Modal>

      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Book"
        setMemberUSN={setMemberUSN}
        setBookID={setBookID}
      >
        {/* Book selection form or content goes here */}
        <p>Book selection modal content</p>
      </Modal>

      {isDateModalOpen && (
        <DateModal
          isOpen={isDateModalOpen}
          onClose={() => setIsDateModalOpen(false)}
          onSelectDate={(date: Date) => {
            setReturnDate(date.toISOString().split("T")[0]); // Set the selected return date
            setIsDateModalOpen(false); // Close the modal after selecting a date
          }}
        />
      )}

      {/* Display the history of lent books */}
      <div className="flex flex-col border h-96 m-2 rounded-2xl border-white/15 text-white/35 ms-4 overflow-hidden">
        <div className="bg-white/15 p-2">History</div>
        <div className="flex-1 overflow-auto">
          {lentBooks.length > 0 ? (
            lentBooks.map((book) => (
              <div
                key={book.ID}
                className="p-2 border-b border-white/20 hover:bg-black hover:text-white/50"
              >
                <div className="flex justify-between">
                  <span>
                    <strong>USN:</strong> {book.usn}
                  </span>
                  <span>
                    <strong>Book ID:</strong> {book.bookID}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    <strong>Lent Date:</strong> {book.Lent}
                  </span>
                  <span>
                    <strong>Return Date:</strong>{" "}
                    {book.collect || "Not returned"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No lent books found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LendBook;
