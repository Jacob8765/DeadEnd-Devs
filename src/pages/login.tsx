import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "./components/Navbar";

const login = () => {
  return (
    <>
      <Navbar />
      <div>login</div>
    </>
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
}