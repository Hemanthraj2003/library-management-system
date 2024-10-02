"use client";
import Navbar from "./Navbar";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row min-h-screen min-w-full ">
      <Navbar />
      {children}
    </section>
  );
}
