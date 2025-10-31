import LoginForm from "@/components/auth/loginForm";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/authOptions";

async function Login() {
  const sessionData = await getServerSession(authOptions);

  // redirect if session  exits
  if (sessionData?.user) {
    const role = sessionData.user.role;
    if (role != "super_admin" && role != "admin") {
      redirect("/dashboard/articles");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-lightRed to-darkRed">
      <h2 className="text-4xl font-semibold text-white">login</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
