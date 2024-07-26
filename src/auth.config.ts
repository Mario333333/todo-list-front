import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod"; // zod is a library to validate data
import { dataBaseLogin } from "./actions";

// ejecuted in the server side
export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;


      const isInTasks = nextUrl.pathname.startsWith("/tasks");
      
      const isInauth = nextUrl.pathname.startsWith("/auth");

      if (isInauth) {
        if (isLoggedIn) return false;
        return true;
      }

      if (isInTasks) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/auth/login", nextUrl)); 
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/tasks", nextUrl));
      }
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //search email


        const  {user}  = await dataBaseLogin(email, password);

        if (!user) return null;
       

        // return the user, and information about the user, roles  name etc
        const { password: _, ...rest } = user;

        return rest; //anula la autenticacion
      },
    }),
  ], 
} satisfies NextAuthConfig;
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
