"use server"

import { addBlog, likeBlog } from "@/app/services/blog"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const incrementLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await likeBlog(id)

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}