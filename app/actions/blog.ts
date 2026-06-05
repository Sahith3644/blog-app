"use server"
<<<<<<< HEAD

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
=======
import { Redirect } from "next"
import { Revalidate } from "next/dist/server/lib/cache-control"
import { addBlog } from "../services/blog"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import blog from "../blogs/blog"

const createblog=async(formData:FormData)=>{
    const content=formData.get("content") as string
    const like=formData.get("like") as string
    const title=formData.get("title") as string
    addBlog(content,like,title)
    revalidatePath("/notes")
    redirect("/notes")
}
>>>>>>> 9b9b0a4f7e3f6c46311ffe592eaa5f06ebbf39ec
