import Link from "next/link";

const LandingPage = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="flex items-center justify-between bg-white px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800">Deadend Devs</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href={"/home"} className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/about"} className="text-gray-800 hover:text-gray-600">
              About
            </Link>
          </li>
          <li>
            <Link href={"/login"} className="text-gray-800 hover:text-gray-600">
              Login/Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    <main className="mx-auto max-w-5xl px-8 py-12">
      <h2 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to Deadend Devs!
      </h2>
      <div className="mb-8 text-lg text-gray-600">
        A place where you showcase your code to others in{" "}
        <span className="text-red-600">informative</span> and
        <span className="text-red-600"> educational</span> ways!
      </div>
      <button className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700">
        Sign up now
      </button>
    </main>
    <footer className="bg-gray-800 px-8 py-4 text-center text-white">
      <p>&copy; 2023 My App. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;
