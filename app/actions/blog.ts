"use server"

import { auth } from "@/auth"
import { addBlog, likeBlog } from "@/app/services/blog"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

type BlogFormState = {
  errors: {
    title?: string
    author?: string
    url?: string
  }
  values: {
    title: string
    author: string
    url: string
  }
}
export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  await db.insert(readingList).values({
    userId: user.id,
    blogId,
    read: false,
  })

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string).trim()
  const author = (formData.get("author") as string).trim()
  const url = (formData.get("url") as string).trim()

  const errors: BlogFormState["errors"] = {}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
    }
  }

  await addBlog(title, author, url)

  revalidatePath("/")
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const incrementLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await likeBlog(id)

  revalidatePath("/")
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}