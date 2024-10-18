import React from "react";
interface Member {
  name: string;
  USN: string;
  emailID: string;
  gender: string;
  DOB: string;
}

interface memberCardParams {
  member: Member;
}
const RenderMemberCard: React.FC<memberCardParams> = ({ member }) => {
  return (
    <div className="bg-white/10 text-white/40 hover:bg-black/20 hover:text-white/70 p-3 mx-3 mt-2 rounded-md flex flex-col">
      <div className="text-3xl">{member.name}</div>
      <div className="flex justify-between w-5/6">
        <div>{member.USN}</div>
        <div>{member.emailID}</div>
        <div>{member.DOB}</div>
        <div>{member.gender}</div>
      </div>
    </div>
  );
};

export default RenderMemberCard;
