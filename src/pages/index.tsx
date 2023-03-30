import Link from "next/link";

const LandingPage = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="flex items-center justify-between bg-white px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800">My App</h1>
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
        Welcome to My App
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
        eleifend neque. Sed ullamcorper dolor vel ipsum accumsan, a dapibus odio
        elementum.
      </p>
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
