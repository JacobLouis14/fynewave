import LoginForm from "@/components/auth/loginForm";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/authOptions";

async function Login() {
  const sessionData = await getServerSession(authOptions);

  // redirect if session  exits
  if (sessionData?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-lightRed to-darkRed">
      <h2 className="text-4xl font-semibold text-white">login</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
