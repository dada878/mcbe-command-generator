import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-4xl">Hello!</h1>
      <Link href="/rawtext" className="text-blue-300">
        Go to rawtext page
      </Link>
    </div>
  );
}