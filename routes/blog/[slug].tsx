import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import { handler as postHandler } from "@/routes/api/posts/[slug].ts";
import { Post } from "@/lib/types.ts";
import Container from "@/components/Container.tsx";

export const handler: Handlers<Post> = {
  async GET(req, ctx) {
    const { GET: getPost } = postHandler;
    const response = await getPost!(req, ctx);

    if (!response.ok) return ctx.renderNotFound();

    const post = await response.json();

    return ctx.render(post);
  },
};

const PostPage = (props: PageProps<Post>) => {
  const { data } = props;
  const { content, publishedAt, title } = data;

  return (
    <Container>
      <Head>
        <title>{title} - Việt Huỳnh - Blog</title>
      </Head>
      <article class="max-w-full prose">
        <h2 class="text-3xl mb-0">{title}</h2>
        <time class="italic text-gray-500">
          {new Date(publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>
        <div dangerouslySetInnerHTML={{ __html: render(content) }} />
      </article>
    </Container>
  );
};

export default PostPage;