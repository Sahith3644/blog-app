"use server"

import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/app/services/session"
import { readingList } from "@/db/schema"
import { randomUUID } from "crypto"


type RegisterState = {
  errors: {
    username?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values: {
    username: string
    name: string
  }
}
export const generateToken = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const token = `${crypto.randomUUID()}-${Date.now()}-${Math.random()}`

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
  redirect("/me")
}
export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const id = Number(formData.get("id"))

  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, id))

  revalidatePath("/me")
}
export const registerUser = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const username = (formData.get("username") as string).trim()
  const name = (formData.get("name") as string).trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterState["errors"] = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    errors.username = "Username is already taken"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}