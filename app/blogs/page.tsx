import Link from "next/link"
import { getBlogs } from "@/app/services/blog"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; created?: string }>
}) {
  const { filter, created } = await searchParams
  {created === "true" && (
  <div
    data-testid="notification"
    className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700"
  >
    Blog created
  </div>
)}
  const blogs = await getBlogs()

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : blogs

  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">blogs</h2>

      <form className="mb-6">
  <label>
    search
    <input
      data-testid="filter-input"
      className="ml-2 rounded border px-2 py-1"
      name="filter"
      defaultValue={filter ?? ""}
    />
  </label>
  <div
  data-testid="notification"
  className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700"
>
  Blog created
</div>

  <button
    data-testid="search-button"
    className="ml-2 rounded bg-blue-600 px-3 py-1 text-white"
  >
    search
  </button>
</form>

      <div data-testid="blogs-list" className="space-y-3">
        {sortedBlogs.map((blog) => (
          <div key={blog.id} className="rounded border bg-white p-4 shadow">
            <Link href={`/blogs/${blog.id}`} className="font-bold text-blue-700">
              {blog.title}
            </Link>
            <p>{blog.author}</p>
            <p>{blog.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  )
}