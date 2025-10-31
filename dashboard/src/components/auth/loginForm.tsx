"use client";
import { LoginFormData } from "@/models/auth";
import { signIn, useSession } from "next-auth/react";
import { redirect, RedirectType, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // login btn handler
  const loginBtnHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // validation
      const { email, password } = loginData;
      if (!email || !password) {
        toast.error("Enter valid data");
        return;
      }

      !loading && setLoading(true);

      // actions
      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });
      // console.log(result);

      // if (result?.status === 401) {
      //   toast.warning("check internet : not found");
      // } else
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const role = session.user.role;
      const isAdmin = role == "super_admin" || role == "admin";

      if (isAdmin) {
        redirect("/dashboard");
      } else {
        redirect("/dashboard/articles?status=published");
      }
    }
  }, [session]);

  return (
    <form
      onSubmit={(e) => loginBtnHandler(e)}
      className="flex flex-col gap-6 md:min-w-96 px-5 py-5 md:px-10 md:py-16 shadow-2xl rounded-lg"
    >
      <div>
        <input
          type="email"
          placeholder="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="border-none outline-none w-full rounded-md py-3 px-4"
        />
      </div>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          value={loginData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="border-none outline-none w-full rounded-md py-3 px-4"
        />
        <div className="flex gap-2 mt-3 ps-1">
          <input
            type="checkbox"
            className="w-4 aspect-square"
            onChange={() => setShowPassword(!showPassword)}
          />
          <p className="text-white">show password</p>
        </div>
      </div>
      <div className="ms-auto mt-5">
        <button
          type="submit"
          className="px-5 py-2 bg-white text-lightRed rounded-lg hover:font-bold"
          disabled={loading}
        >
          {loading ? "please wait" : "login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
