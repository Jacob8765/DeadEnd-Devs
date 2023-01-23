import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="mx-5 flex justify-between">
      <div>DeadEnd Devs</div>
      {session ? <LoggedIn session={session} /> : <LoggedOut />}
      {session && <button onClick={() => void signOut()}>Sign out</button>}
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
