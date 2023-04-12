import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="m-2 mx-auto flex w-[98%] items-center justify-between">
      <Link href={"/"} className="text-3xl font-bold">
        DeadEnd Devs
      </Link>
      {session ? <LoggedIn session={session} /> : <LoggedOut />}
      {session && (
        <Button onClick={() => void signOut()} className="rounded-md py-3">
          Sign out
        </Button>
      )}
    </div>
  );
};

function LoggedIn({ session }: { session: Session }) {
  const { user } = session;
  return <div className="text-xl">Welcome back, {user?.name ?? "User"}!</div>;
}

function LoggedOut() {
  return (
    <div>
      <Button onClick={() => void signIn()} className="relative top-4">
        Click here to log in!
      </Button>
    </div>
  );
}

export default Navbar;
