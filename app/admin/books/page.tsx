"use client";
import React, { useState } from "react";
import CustumInput from "../CustumInput";

const Books = () => {
  const [selected, setSelected] = useState("add");
  const [bookTitle, setBookTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [language, setLanguage] = useState("");
  const [stock, setStock] = useState("");
  return (
    <div className="flex flex-col flex-1 rounded-3xl m-10 bg-white/10">
      <div className="flex flex-1 justify-evenly bg-white/20 rounded-t-3xl text-center cursor-pointer">
        <div
          className={`${
            selected === "add" && "bg-black/50"
          } flex-1 hover:bg-black/50 p-3`}
          onClick={() => {
            setSelected("add");
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
        <div className="flex flex-shrink-0  w-1/2 p-3 h-full">
          <div className="flex flex-1 p-10 flex-col justify-evenly h-full">
            {selected != "add" && (
              <span className="text-sm text-center -mb-5">
                Enter Title or Author Name to Search
              </span>
            )}
            <CustumInput
              inputName="Book Title"
              isDisabled={false}
              setValue={setBookTitle}
            />
            <CustumInput
              inputName="Author Name"
              isDisabled={false}
              setValue={setAuthors}
            />
            <CustumInput
              inputName="Language"
              isDisabled={false}
              setValue={setLanguage}
            />
            <CustumInput
              inputName="Stock"
              isDisabled={false}
              setValue={setStock}
            />
            {selected === "add" ? (
              <div className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-3 text-center rounded-md hover:border border-white/15 border-2 cursor-pointer">
                ADD NEW BOOK
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-evenly w-full">
                  <div className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-[10px] text-center rounded-md hover:border border-white/15 border-2 cursor-pointer mb-5 w-full">
                    Search BOOK
                  </div>
                </div>
                <div className="flex justify-evenly text-white/50 text-center">
                  <div className="bg-white/10 hover:bg-red-400 font-black w-2/5 p-[10px]  border-white/15 border-2 rounded-lg">
                    Delete
                  </div>
                  <div className="bg-white/10 w-2/5 p-[10px] hover:bg-black/50 border-white/15 border-2 rounded-lg">
                    Update
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-shrink w-1/2  bg-white/10 m-2 me-4 mb-4 mt-10 rounded-2xl ">
          <div className="text-white/80 bg-white/15 p-3 rounded-t-2xl ">
            {selected === "add" ? "All Books" : "Search Results"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
