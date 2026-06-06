import Link from "next/link"
import { getUsers } from "@/app/services/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <main>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}