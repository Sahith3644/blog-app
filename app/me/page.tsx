import Link from "next/link"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { generateToken, markAsRead } from "@/app/actions/me"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const items = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  })

  const unread = items.filter((item) => !item.read)
  const read = items.filter((item) => item.read)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My page</h2>

      <div className="rounded border bg-white p-4 shadow-sm">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p className="mt-4">
          <strong>API token:</strong>{" "}
          {user.token ? user.token : "No token generated yet"}
        </p>

        <form action={generateToken} className="mt-3">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">
            Generate new token
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-bold">Unread</h3>

        <ul className="space-y-2">
          {unread.map((item) => (
            <li key={item.id} className="rounded border bg-white p-3">
              <Link href={`/blogs/${item.blog.id}`}>
                {item.blog.title}
              </Link>

              <form action={markAsRead} className="mt-2">
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded bg-green-600 px-3 py-1 text-white">
                  Mark as read
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold">Read</h3>

        <ul className="space-y-2">
          {read.map((item) => (
            <li key={item.id} className="rounded border bg-white p-3">
              <Link href={`/blogs/${item.blog.id}`}>
                {item.blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}