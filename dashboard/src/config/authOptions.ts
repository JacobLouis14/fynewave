import axios from "axios";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // server req
          const serverResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/auth/sign-in`,
            { email: credentials?.email, password: credentials?.password }
          );

          if (serverResponse.data.data.user && serverResponse.data.data.token) {
            const user = {
              name: serverResponse.data.data.user.name,
              id: serverResponse.data.data.user._id,
              email: serverResponse.data.data.user.email,
              token: serverResponse.data.data.token,
              role: serverResponse.data.data.user.role,
              editAllotedArticle:
                serverResponse.data.data.user.editAllotedArticle,
            };
            return user;
          }
        } catch (error: any) {
          throw new Error(
            error.response.data.message || "Something went wrong"
          );
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // const decodedToken: any = jwtDecode(user.token);
        // token.expirationTime = decodedToken.exp * 1000;
      }

      // if (token.expirationTime && typeof token.expirationTime === "number") {
      //   const currentTime = Date.now();
      //   const timeLeft = token.expirationTime - currentTime;

      //   // If the token is already expired or about to expire, log the user out
      //   if (timeLeft <= 0) {
      //     return ; // This will trigger a session expiration
      //   }

      //   // Update the `maxAge` dynamically based on the remaining time
      //   token.maxAge = timeLeft;
      // }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
