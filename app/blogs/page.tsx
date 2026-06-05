<<<<<<< HEAD
import Link from "next/link"
import { getBlogs } from "@/app/services/blog"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <main>
      <h1>Blogs</h1>

      <form action="/blogs">
        <input
          type="text"
          name="filter"
          placeholder="Search by title"
          defaultValue={filter ?? ""}
        />
        <button type="submit">Search</button>
      </form>

      <p>
        <Link href="/blogs/new">Create new blog</Link>
      </p>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} —{" "}
            {blog.likes} likes
          </li>
        ))}
      </ul>
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
