import Link from "next/link";



export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex gap-3">
        <Card
          title="Tellraw"
          description="Create and manage items"
          href="/tellraw"
        />
        <Card
          title="Titleraw"
          description="Create and manage items"
          href="/titleraw"
        />
        <Card
          title="Rawtext"
          description="Create and manage items"
          href="/rawtext"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-[#35353C] rounded-lg p-4 w-64 m-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
