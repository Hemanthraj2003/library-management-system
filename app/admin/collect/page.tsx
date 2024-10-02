"use client";
import React, { useState } from "react";
import CustumInput from "../CustumInput";

const Collect = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lentID, setLentID] = useState("");
  const [bookID, setBookID] = useState("");
  const [name, setName] = useState("");
  const [lentDate, setLentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [title, setTilte] = useState("");
  const [contactInfo, setContactInfo] = useState("");

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
              inputName="Member ID"
              isDisabled={isDisabled}
              setValue={setName}
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
            <div className="px-5 py-3 text-center bg-white/30 hover:bg-white/10 cursor-pointer hover:text-white rounded-xl">
              COLLECT BOOK
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/6 bg-white/10 rounded-3xl">
          <div className="bg-white/20 rounded-t-3xl p-2 ps-8">
            Search Results
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collect;
