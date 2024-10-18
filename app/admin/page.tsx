"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const Page = () => {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Navigate to /admin/lend when the component mounts
    router.push("/admin/lend");
  }, [router]); // Add router as a dependency

  return <div>Loading...</div>; // Optional loading state or message
};

export default Page;
