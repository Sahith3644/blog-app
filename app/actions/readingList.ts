"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const blogId = Number(formData.get("blogId"))

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId)
    ),
  })

  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}