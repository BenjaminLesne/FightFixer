
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export default function HomePage() {
  prefetch(trpc.post.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        Home
      </main>
    </HydrateClient>
  );
}
