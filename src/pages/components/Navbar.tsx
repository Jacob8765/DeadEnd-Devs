import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="mx-5 flex justify-between">
      <Link href={"/"}>DeadEnd Devs</Link>
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
  return <div>Welcome back, {user?.name ?? "User"}!</div>;
}

function LoggedOut() {
  return (
    <div>
      <button onClick={() => void signIn()}>Click here to log in!</button>
    </div>
  );
}

export default Navbar;
