import Link from "next/link"
import { getBlogs } from "@/app/services/blog"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const blogs = await getBlogs()

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs

  const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Blogs</h2>

      <form className="mb-6 flex gap-2">
        <input
          className="w-full rounded border px-3 py-2"
          name="filter"
          placeholder="Search by title"
          defaultValue={filter || ""}
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="mb-6">
        <Link
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          href="/blogs/new"
        >
          Create new blog
        </Link>
      </div>

      <ul className="space-y-3">
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="rounded border bg-white p-4 shadow-sm">
            <Link
              className="text-lg font-semibold text-blue-700 hover:underline"
              href={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
            <p className="text-sm text-slate-600">
              by {blog.author} • {blog.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}