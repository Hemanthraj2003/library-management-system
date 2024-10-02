import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between py-8 w-52 min-h-full bg-gray-200 text-black transition-all duration-1000 text-center">
      <div className="font-black text-[2rem]">Liberary</div>
      <div className="flex flex-col items-center justify-evenly h-full min-w-full text-lg font-semibold">
        <Link
          href="/admin/lend"
          className={`min-w-full py-6 hover:bg-black/40 hover:text-white ${
            pathname === "/admin/lend" ? "bg-black/40 text-white" : ""
          }`}
        >
          <div>Lend Book</div>
        </Link>
        <Link
          href="/admin/collect"
          className={`min-w-full py-6 hover:bg-black/40 hover:text-white ${
            pathname === "/admin/collect" ? "bg-black/40 text-white" : ""
          }`}
        >
          <div>Collect Book</div>
        </Link>
        <Link
          href="/admin/members"
          className={`min-w-full py-6 hover:bg-black/40 hover:text-white ${
            pathname === "/admin/members" ? "bg-black/40 text-white" : ""
          }`}
        >
          <div>Members</div>
        </Link>
        <Link
          href="/admin/books"
          className={`min-w-full py-6 hover:bg-black/40 hover:text-white ${
            pathname === "/admin/books" ? "bg-black/40 text-white" : ""
          }`}
        >
          <div>Manage Book</div>
        </Link>
        <Link
          href="/admin/reports"
          className={`min-w-full py-6 hover:bg-black/40 hover:text-white ${
            pathname === "/admin/reports" ? "bg-black/40 text-white" : ""
          }`}
        >
          <div>Report</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
