import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.select().from(users)
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  })
}