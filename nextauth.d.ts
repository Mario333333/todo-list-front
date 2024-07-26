import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      userExist: {email:string, id:string}
    } & DefaultSession["user"];// add default session user
  }
}

