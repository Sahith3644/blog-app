import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

export const POST = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = `${crypto.randomUUID()}-${Date.now()}-${Math.random()}`

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  return NextResponse.json({ token })
}