import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { eq } from "drizzle-orm"
import { markAsRead } from "@/app/actions/users"
import GenerateTokenButton from "./GenerateTokenButton"

export default async function MePage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>
}) {
  if (searchParams) {
    await searchParams
  }

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
    <div className="space-y-8">
      <section data-testid="user-profile" className="rounded border bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">my profile</h2>
        <p data-testid="user-name">{user.name}</p>
        <p data-testid="user-username">{user.username}</p>
      </section>

      <section
        data-testid="reading-list-section"
        className="rounded border bg-white p-6"
      >
        <h2 className="mb-4 text-2xl font-bold">reading list</h2>

        {items.length === 0 && (
          <p data-testid="empty-reading-list">No blogs in reading list</p>
        )}

        {items.length > 0 && unread.length === 0 && (
          <p data-testid="no-unread-blogs">No unread blogs</p>
        )}

        {unread.length > 0 && (
          <div data-testid="unread-section">
            <h3 className="font-bold">unread</h3>
            {unread.map((item) => (
              <div key={item.id} data-testid="unread-blog" className="border-b py-2">
                <span>{item.blog.title}</span>

                <form action={markAsRead} className="inline">
                  <input type="hidden" name="id" value={item.id} />

                  <button
                    data-testid={`mark-read-${item.id}`}
                    className="ml-3 rounded bg-blue-600 px-2 py-1 text-white"
                  >
                    mark as read
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}

        {read.length > 0 && (
          <div data-testid="read-section" className="mt-4">
            <h3 className="font-bold">read</h3>

            {read.map((item) => (
              <div key={item.id} data-testid="read-blog" className="border-b py-2">
                {item.blog.title}
              </div>
            ))}
          </div>
        )}
      </section>

      <section data-testid="api-token-section" className="rounded border bg-white p-6">
  <h2 className="mb-4 text-2xl font-bold">api token</h2>

  {!user.token && (
    <p data-testid="no-token-message">No token generated yet</p>
  )}

  <GenerateTokenButton initialToken={null} />
</section>
    </div>
  )
}