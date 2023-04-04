import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg  bg-blue-500 p-6 shadow-lg">
        <button
          onClick={() => void signIn("google")}
          className="relative rounded-lg bg-white px-4 py-2 pl-10 text-blue-500"
        >
          <Image
            src="/google-icon.png"
            alt="google icon"
            width={25}
            height={25}
            className="absolute left-2"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
