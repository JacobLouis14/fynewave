import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      token: string;
      id: string;
      role: string;
      editAllotedArticle: string[];
    };
  }
  interface User {
    name: string;
    email: string;
    token: string;
    id: string;
    role: string;
    editAllotedArticle: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      name: string;
      email: string;
      token: string;
      id: string;
      role: string;
      editAllotedArticle: string[];
    };
  }
}
