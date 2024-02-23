import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <div className="w-full h-[120vh] px-6 -mt-12 flex items-center justify-center">
        <Login />
      </div>
      <Footer />
    </div>
  );
}
