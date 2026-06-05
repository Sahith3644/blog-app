import Link from "next/link"
import { getUserByUsername } from "@/app/services/users"
import { notFound } from "next/navigation"

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <main>
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
    </main>
  )
}
