import { getBlogById } from "@/app/services/blog"
import { incrementLikes } from "@/app/actions/blog"
import { addToReadingList } from "@/app/actions/readingList"
import { getCurrentUser } from "@/app/services/session"
import { notFound } from "next/navigation"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isOwnBlog = user && blog.userId === user.id

  return (
    <div className="rounded border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-blue-700">{blog.title}</h2>

      <p>
        <strong>Author:</strong> {blog.author}
      </p>

      <p>
        <strong>URL:</strong>{" "}
        <a className="text-blue-600 hover:underline" href={blog.url}>
          {blog.url}
        </a>
      </p>

      <p>
        <strong>Likes:</strong> {blog.likes}
      </p>

      <form action={incrementLikes} className="mt-4">
        <input type="hidden" name="id" value={blog.id} />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Like
        </button>
      </form>

      {user && !isOwnBlog && (
        <form action={addToReadingList} className="mt-4">
          <input type="hidden" name="blogId" value={blog.id} />
          <button className="rounded bg-green-600 px-4 py-2 text-white">
            Add to reading list
          </button>
        </form>
      )}
    </div>
  )
}