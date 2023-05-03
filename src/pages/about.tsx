import Link from "next/link";
import Navbar from "../components/Navbar";

const about = () => (
  <>
    <Navbar />
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-6xl font-bold">About Us</h1>
      <div className="max-w-4xl text-center leading-loose">
        <p className="mb-4 text-gray-600">
          Our social media platform is designed exclusively for developers,
          providing them with a platform to share anything code-related. We
          offer a multi-paradigm approach, allowing users to post any content in
          two boxes. The left box is optional and can be used to showcase your
          not-so-perfect code, while the right box can be used to highlight your
          best code. This approach provides a unique way to track your growth as
          a developer and get feedback from other experienced developers in the
          community.{" "}
        </p>
        <p className="text-gray-600">
          With our social media platform, you can also post redundant code on
          the left and the right way to write the same code on the right. This
          feature encourages users to share their coding journey, learn from
          others, and improve their coding skills. Developers can react to and
          comment on posts, allowing for a more engaging and interactive
          experience. Join our community of like-minded developers and share
          your coding experience with others while exploring new and innovative
          ways to code {"<3"}
        </p>
      </div>
      <Link
        href={"/login"}
        className="mt-6 rounded-md bg-blue-500 p-4 text-white hover:bg-blue-700"
      >
        Sign up or Log in!
      </Link>
    </div>
  </>
);

export default about;
