"use server"

import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { users, readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

export const generateToken = async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}

export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const id = Number(formData.get("id"))

  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, user.id)))

  revalidatePath("/me")
}