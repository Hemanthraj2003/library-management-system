"use client";
import React, { useState } from "react";
import CustumInput from "../CustumInput";

const Members = () => {
  const [selected, setSelected] = useState("add");
  const [memberID, setMemberID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");

  return (
    <div className="flex flex-col flex-1 m-10 bg-white/10 rounded-3xl">
      <div className="flex justify-evenly bg-white/20 rounded-t-3xl text-center cursor-pointer">
        <div
          className={`${
            selected === "add" && "bg-black/50"
          } flex-1 hover:bg-black/50 p-3`}
          onClick={() => {
            setSelected("add");
          }}
        >
          Add Members
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
        <div className="flex flex-shrink-0 w-1/2 rounded text-white/50 p-3 h-full">
          <div className="flex flex-1 p-10 flex-col justify-evenly">
            {selected != "add" && (
              <span className="text-sm text-center -mb-5">
                Enter Name / USN or Email_ID to Search
              </span>
            )}
            <CustumInput
              inputName="Name"
              isDisabled={false}
              setValue={setName}
            />
            <CustumInput inputName="USN" isDisabled={false} setValue={setUsn} />
            <CustumInput
              inputName="Email-ID"
              isDisabled={false}
              setValue={setEmail}
            />
            <CustumInput
              inputName="Gender"
              isDisabled={false}
              setValue={setGender}
            />
            <CustumInput
              inputName="D.O.B"
              isDisabled={false}
              setValue={setDOB}
            />
            {selected === "add" ? (
              <div className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-3 text-center rounded-md hover:border border-white/15 border-2 cursor-pointer">
                ADD NEW MEMBER
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-evenly w-full">
                  <div className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-[10px] text-center rounded-md hover:border border-white/15 border-2 cursor-pointer mb-5 w-full">
                    Search Member
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
            {selected === "add" ? "All Members" : "Search Results"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
