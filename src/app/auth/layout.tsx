// to create layout with sortcouts type lrc

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  const session = await auth();
   if ( session ) {
     redirect('/')
   }

  return <div className="flex justify-center">
    <div className="w-full sm:w-[350px] px-5">{children}</div>
  </div>;
}
