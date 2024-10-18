"use client";
import React, { useState } from "react";
import CustumInput from "../CustumInput";

// Define the type for the search result
interface LentRecord {
  ID: string;
  usn: string;
  bookID: string;
  Lent: string; // or Date if you're using Date objects
  collect: string; // Assuming collect can be null
}

const Collect: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [lentID, setLentID] = useState<string>("");
  const [bookID, setBookID] = useState<string>("");
  const [lentDate, setLentDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [USN, setUSN] = useState<string>("");
  const [searchResults, setSearchResults] = useState<LentRecord[]>([]); // State for storing search results

  const handleSearch = async () => {
    // Build the search query based on user input
    const searchParams = new URLSearchParams();
    if (lentID) searchParams.append("search", lentID); // Send the lentID as search term
    if (bookID) searchParams.append("search", bookID); // Send the bookID as search term
    if (lentDate) searchParams.append("search", lentDate); // Send the lentDate as search term
    if (returnDate) searchParams.append("search", returnDate); // Send the returnDate as search term
    if (USN) searchParams.append("search", USN); // Send the USN as search term

    const response = await fetch(`/api/lend?${searchParams.toString()}`); // Adjust the API path if necessary
    if (response.ok) {
      const data: LentRecord[] = await response.json(); // Specify the type of data
      setSearchResults(data); // Store the fetched results in state
    } else {
      console.error("Failed to fetch data from API");
    }
  };

  const setValues = (
    lentID = "",
    lentDate = "",
    returnDate = "",
    bookID = "",
    USN = ""
  ) => {
    setLentID(lentID);
    setLentDate(lentDate);
    setReturnDate(returnDate);
    setBookID(bookID);
    setUSN(USN);
  };

  const handleCollect = async () => {
    if (!lentID) {
      console.error("Lent ID is required to collect the book");
      return; // Ensure that lentID is not empty before proceeding
    }

    const response = await fetch(`/api/lend?id=${lentID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setSearchResults((prevResults) =>
        prevResults.filter((result) => result.ID !== lentID)
      );
      // Reset fields after deletion
      setValues();
      console.log("Record deleted successfully!");
    } else {
      console.error("Failed to delete the record");
    }
  };

  // Check if all required fields are filled
  const isCollectButtonDisabled = !lentID || !bookID || !lentDate || !USN;

  return (
    <div className="flex flex-col flex-1 m-10 p-3 bg-white/10 rounded-3xl justify-between">
      <div className="flex ps-7 pt-4 h-full gap-3">
        <div className="flex flex-col h-full w-3/6 px-6">
          <div className="text-2xl text-white/70">Collect Book</div>
          <div className="flex flex-col justify-evenly h-full text-white/50">
            <CustumInput
              inputName="Lent ID"
              isDisabled={isDisabled}
              setValue={setLentID}
              value={lentID}
            />
            <CustumInput
              inputName="Lent Date"
              isDisabled={isDisabled}
              setValue={setLentDate}
              value={lentDate}
            />
            <CustumInput
              inputName="Return Date"
              isDisabled={isDisabled}
              setValue={setReturnDate}
              value={returnDate}
            />
            <CustumInput
              inputName="Book ID"
              isDisabled={isDisabled}
              setValue={setBookID}
              value={bookID}
            />
            <CustumInput
              inputName="USN"
              isDisabled={isDisabled}
              setValue={setUSN}
              value={USN}
            />
            <div className="flex flex-col gap-3 -mt-3">
              <div
                className="px-5 py-3 text-center bg-white/30 hover:bg-white/10 cursor-pointer hover:text-white hover:bg-green-600 rounded-xl"
                onClick={handleSearch} // Call handleSearch on click
              >
                SEARCH
              </div>
              <div
                className={`px-5 py-3 text-center ${
                  isCollectButtonDisabled
                    ? "bg-white/30 hover:bg-white/10 hover:text-white rounded-xl cursor-not-allowed"
                    : "bg-white/30 hover:bg-white/10 hover:text-white rounded-xl cursor-pointer"
                }`}
                onClick={() => !isCollectButtonDisabled && handleCollect()} // Call handleCollect when clicked
              >
                COLLECT BOOK
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/6 bg-white/10 rounded-3xl">
          <div className="bg-white/20 rounded-t-3xl p-2 ps-8">
            Search Results
          </div>
          <div className="p-4 overflow-y-auto h-full">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.ID}
                  className="bg-white/15 p-2 my-2 rounded-lg hover:bg-black/50 transition-all duration-300"
                  onClick={() =>
                    setValues(
                      result.ID,
                      result.Lent,
                      result.collect,
                      result.bookID,
                      result.usn
                    )
                  }
                >
                  <div>
                    <strong>Lent ID:</strong> {result.ID}
                  </div>
                  <div>
                    <strong>USN:</strong> {result.usn}
                  </div>
                  <div>
                    <strong>Book ID:</strong> {result.bookID}
                  </div>
                  <div>
                    <strong>Lent Date:</strong> {result.Lent}
                  </div>
                  <div>
                    <strong>Return Date:</strong>{" "}
                    {result.collect || "Not yet collected"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white/50">No results found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collect;
