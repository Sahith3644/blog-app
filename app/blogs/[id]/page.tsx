import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blog"
import { addToReadingList, incrementLikes } from "@/app/actions/blog"

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
    <div data-testid="blog-detail" className="rounded border bg-white p-6 shadow">
      <h2 data-testid="blog-title" className="mb-2 text-2xl font-bold">
        {blog.title}
      </h2>

      <p data-testid="blog-author">Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>{blog.likes} likes</p>

      <form action={incrementLikes} className="mt-4">
        <input type="hidden" name="id" value={blog.id} />
        <button className="rounded bg-blue-600 px-3 py-1 text-white">
          like
        </button>
      </form>

      <form action={addToReadingList} className="mt-4">
        <input type="hidden" name="blogId" value={blog.id} />
        <button
          data-testid="add-to-reading-list-button"
          className="rounded bg-green-600 px-3 py-1 text-white"
        >
          add to reading list
        </button>
      </form>
    </div>
  )
}