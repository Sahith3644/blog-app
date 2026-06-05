<<<<<<< HEAD
import { incrementLikes } from "@/app/actions/blog"
import { getBlogById } from "@/app/services/blog"
import { notFound } from "next/navigation"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>

      <form action={incrementLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </main>
  )
}
=======
export default function BlogPage() {
  return (
    <div>
      Blog Page
    </div>
  );
}
>>>>>>> 9b9b0a4f7e3f6c46311ffe592eaa5f06ebbf39ec
