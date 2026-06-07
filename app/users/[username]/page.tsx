import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsername } from "@/app/services/users"

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>

      <h2>Blogs</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}