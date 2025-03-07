"use client";
import { createUserForAdmin } from "@/actions/sActions";
import { UserDataModel } from "@/models/auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [newUserData, setNewUserData] = useState<UserDataModel>({
    name: "",
    email: "",
    password: "",
    role: 1,
  });
  const { pending } = useFormStatus();
  const { data: session } = useSession();

  // user creation handler
  const userCreationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, name, password } = newUserData;

    if (!email || !name || !password) {
      toast.error("complete form");
      return;
    }

    const newUserFormData = new FormData();
    newUserFormData.append("name", newUserData.name);
    newUserFormData.append("email", newUserData.email);
    newUserFormData.append("password", newUserData.password || "");
    newUserFormData.append("role", newUserData.role?.toString());

    const { data, error } = await createUserForAdmin(
      newUserFormData,
      session?.user.token || ""
    );
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("User created successfully");
      setNewUserData({
        name: "",
        email: "",
        password: "",
        role: 1,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => userCreationHandler(e)}
      className="w-full flex flex-col gap-3"
    >
      <input
        type="text"
        className="outline-none rounded-md px-4 py-3 w-full"
        placeholder="Enter new user name"
        name="name"
        value={newUserData.name}
        onChange={(e) =>
          setNewUserData({ ...newUserData, name: e.target.value })
        }
      />
      <input
        type="email"
        className="outline-none rounded-md px-4 py-3 w-full"
        placeholder="Enter new user email"
        name="email"
        value={newUserData.email}
        onChange={(e) =>
          setNewUserData({ ...newUserData, email: e.target.value })
        }
      />
      <input
        type="password"
        className="outline-none rounded-md px-4 py-3 w-full"
        placeholder="Create password"
        name="password"
        value={newUserData.password}
        onChange={(e) =>
          setNewUserData({ ...newUserData, password: e.target.value })
        }
      />
      <div className="flex gap-2">
        <input
          type="radio"
          name="userRole"
          id="admin"
          value="0"
          checked={newUserData.role === 0}
          onChange={() => setNewUserData({ ...newUserData, role: 0 })}
        />
        <label htmlFor="admin">Admin</label>
      </div>
      <div className="flex gap-2">
        <input
          type="radio"
          name="userRole"
          id="content-writer"
          value="1"
          checked={newUserData.role === 1}
          onChange={() => setNewUserData({ ...newUserData, role: 1 })}
        />
        <label htmlFor="content-writer">Content-Writer</label>
      </div>
      <button
        disabled={pending}
        type="submit"
        className="px-3 py-1 bg-darkRed text-white mr-auto rounded-md"
      >
        Create User
      </button>
    </form>
  );
};

export default SignupForm;
