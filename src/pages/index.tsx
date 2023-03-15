/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";16
import TimeLine from "./components/TimeLine";
import Navbar from "./components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DeadEnd Devs</title>
        <meta name="description" content="Generated by Gabriel Pedroza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <TimeLine />
      </div>

      <SyntaxHighlighter language="javascript" style={nord} showLineNumbers wrapLongLines>
        {
`console.log("Hello World!");
const someRandomFunc = () => {
  const a = 1;
  let b = 3;

  return a + b
}`
        
        }
      </SyntaxHighlighter>
    </>
  );
};

export default Home;