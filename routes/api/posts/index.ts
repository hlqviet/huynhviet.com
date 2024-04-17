import { Handler } from "$fresh/server.ts";
import { Post } from "@/lib/types.ts";
import { getPosts } from "@/lib/utils.ts";

export const handler: Handler<Post[]> = async () => {
  const posts = await getPosts();

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
};
