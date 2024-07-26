// to create layout with sortcouts type lrc

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


// auth  exported from auth config export const { signIn, signOut,auth } = NextAuth(authConfig);
// function how midddleware py para tener inf in server side 
  const session = await auth();
  // next revalidate this variable 
  //session null or object with user data y expires 
   if ( session ) {
     redirect('/')
   }

  return <div className="flex justify-center">
    <div className="w-full sm:w-[350px] px-5">{children}</div>
  </div>;
}
