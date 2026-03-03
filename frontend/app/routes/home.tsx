import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event Memory App" },
    { name: "description", content: "Event Memory Management Application" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Event Memory App</h1>
    </div>
  );
}
