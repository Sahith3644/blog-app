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
    <main>
      <h1>Blogs</h1>

      <form>
        <input name="filter" defaultValue={filter || ""} />
        <button type="submit">Search</button>
      </form>

      <p>
        <Link href="/blogs/new">Create new blog</Link>
      </p>

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author} ({blog.likes} likes)
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}