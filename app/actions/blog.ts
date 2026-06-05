"use server"
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