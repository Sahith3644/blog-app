import Link from "next/link"
import { getBlogs } from "@/app/services/blog"

export default async function Home() {
  const blogs = await getBlogs()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <main>
      <h2>Recent Blogs</h2>

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
            {" "}by {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </main>
  )
}