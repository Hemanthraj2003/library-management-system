"use client";
import React, { useState } from "react";
import CustumInput from "../CustumInput";

const LendBook = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [memberID, setMemberID] = useState("");
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [bookID, setBookID] = useState("");
  const [title, setTilte] = useState("");
  const [author, setAuthor] = useState("");
  const [lentID, setLentID] = useState("");
  const [lentDate, setLentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = () => {
    console.log(memberID, name, contactInfo);
    console.log(bookID, title, author);
    console.log(lentID, lentDate, returnDate);
  };
  return (
    <div className="flex flex-col flex-1 m-10 p-3 bg-white/10 rounded-3xl justify-between">
      <div className="flex ps-7 pt-4 ">
        <div className="w-10/12">
          <div className="text-3xl text-white/70">Lend Book</div>

          {/*--- borrower details */}
          <div className="text-white/40 mt-3">
            Borrower Details :
            <div className="flex flex-1 text-white/50 justify-evenly mt-2">
              <CustumInput
                inputName="Member ID"
                isDisabled={isDisabled}
                setValue={setMemberID}
              />
              <CustumInput
                inputName="Name"
                isDisabled={isDisabled}
                setValue={setName}
              />
              <CustumInput
                inputName="Contact Info"
                isDisabled={isDisabled}
                setValue={setContactInfo}
              />
            </div>
          </div>
          <div className="text-white/40 mt-3">
            Book Details:
            <div className="flex flex-1 text-white/50 justify-evenly mt-2">
              <CustumInput
                inputName="Book ID"
                isDisabled={isDisabled}
                setValue={setBookID}
              />
              <CustumInput
                inputName="Title"
                isDisabled={isDisabled}
                setValue={setTilte}
              />
              <CustumInput
                inputName="Author"
                isDisabled={isDisabled}
                setValue={setAuthor}
              />
            </div>
          </div>
          <div className="text-white/40 mt-3">
            Lending Details:
            <div className="flex flex-1 text-white/50 justify-evenly mt-2">
              <CustumInput
                inputName="Lent ID"
                isDisabled={isDisabled}
                setValue={setLentID}
              />
              <CustumInput
                inputName="Lent Date"
                isDisabled={isDisabled}
                setValue={setLentDate}
              />
              <CustumInput
                inputName="Return Date"
                isDisabled={isDisabled}
                setValue={setReturnDate}
              />
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <div
            className="p-4 px-7 bg-white/10 rounded-xl"
            onClick={() => handleSubmit()}
          >
            Lend Book
          </div>
        </div>
      </div>
      <div className="flex flex-col border h-96 m-2 rounded-2xl border-white/15 text-white/35 ms-4 overflow-hidden">
        <div className=" bg-white/15 p-2">History</div>
      </div>
    </div>
  );
};

export default LendBook;
