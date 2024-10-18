"use client";
import React, { useEffect, useState } from "react";
import CustumInput from "../CustumInput";
import RenderMemberCard from "./renderMemberCard";

interface Member {
  name: string;
  USN: string;
  emailID: string;
  gender: string;
  DOB: string;
}

const Members = () => {
  const [selected, setSelected] = useState("add");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // Track when search is triggered

  const handleDelete = async (usn: string) => {
    const response = await fetch(`/api/members`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usn }), // Send the USN to identify the member
    });

    if (response.ok) {
      console.log("Member deleted successfully");
      fetchMembers(); // Re-fetch members after deletion
    } else {
      console.log("Error deleting member");
    }
  };

  const handleUpdate = async () => {
    const updatedMember = {
      name: name,
      USN: usn,
      emailID: email,
      DOB,
      gender: gender,
    };

    const response = await fetch(`/api/members`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMember), // Send updated member data
    });

    if (response.ok) {
      console.log("Member updated successfully");
      setName("");
      setUsn("");
      setEmail("");
      setGender("");
      setDOB("");
      fetchMembers(); // Re-fetch members after update
    } else {
      console.log("Error updating member");
    }
  };
  const fetchMembers = async (search = "") => {
    const response = await fetch(`/api/members?search=${search}`); // Pass the search query string
    if (!response.ok) {
      console.log("Error fetching members");
    }
    const data = await response.json();
    setMembers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = () => {
    fetchMembers(searchTerm); // Pass searchParams to the fetch call
    setIsSearchTriggered(true); // Mark search as triggered
  };

  const handlePost = async () => {
    const newMember = {
      name: name,
      USN: usn,
      emailID: email,
      DOB,
      gender: gender,
    };

    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    });
    if (!response.ok) {
      console.log("Error posting data");
    } else {
      setName("");
      setUsn("");
      setEmail("");
      setGender("");
      setDOB("");
      setSearchTerm(""); // Reset search term to show all members
      fetchMembers(); // Re-fetch to get updated list
    }
  };

  const setMemberValues = (member: Member) => {
    if (selected !== "add") {
      setName(member.name);
      setUsn(member.USN);
      setEmail(member.emailID);
      setGender(member.gender);
      setDOB(member.DOB);
    }
  };

  return (
    <div className="flex flex-col flex-1 m-10 bg-white/10 rounded-3xl">
      <div className="flex justify-evenly bg-white/20 rounded-t-3xl text-center cursor-pointer">
        <div
          className={`${
            selected === "add" && "bg-black/50"
          } flex-1 hover:bg-black/50 p-3`}
          onClick={() => {
            setSelected("add");
            setIsSearchTriggered(false); // Reset search trigger when switching to add mode
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
            {selected !== "add" && (
              <span className="text-sm text-center -mb-5">
                Enter Name / USN or Email_ID to Search
              </span>
            )}
            {selected !== "add" && (
              <CustumInput
                inputName="Search"
                isDisabled={false}
                setValue={setSearchTerm} // Update search term on input change
                value={searchTerm}
              />
            )}
            <CustumInput
              inputName="Name"
              isDisabled={false}
              setValue={setName}
              value={name}
            />
            <CustumInput
              inputName="USN"
              isDisabled={false}
              setValue={setUsn}
              value={usn}
            />
            <CustumInput
              inputName="Email-ID"
              isDisabled={false}
              setValue={setEmail}
              value={email}
            />
            <CustumInput
              inputName="Gender"
              isDisabled={false}
              setValue={setGender}
              value={gender}
            />
            <CustumInput
              inputName="D.O.B"
              isDisabled={false}
              setValue={setDOB}
              value={DOB}
            />
            {selected === "add" ? (
              <div
                className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-3 text-center rounded-md hover:border border-white/15 border-2 cursor-pointer"
                onClick={handlePost}
              >
                ADD NEW MEMBER
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-evenly w-full">
                  <div
                    className="bg-white/10 text-white/50 hover:bg-black/30 hover:text-white/70 p-[10px] text-center rounded-md hover:border border-white/15 border-2 cursor-pointer mb-5 w-full"
                    onClick={handleSearch} // Trigger search when button is clicked
                  >
                    Search Member
                  </div>
                </div>
                {isSearchTriggered && (
                  <div className="flex justify-evenly text-white/50 text-center">
                    <div
                      className="bg-white/10 hover:bg-red-400 font-black w-2/5 p-[10px]  border-white/15 border-2 rounded-lg"
                      onClick={() => handleDelete(usn)}
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
            {selected === "add" ? "All Members" : "Search Results"}
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {members.map((member) => (
              <div key={member.USN} onClick={() => setMemberValues(member)}>
                <RenderMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
