import { db } from "@/db"
import { blogs } from "@/db/schema"
import { desc, eq, ilike, sql } from "drizzle-orm"

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db
      .select()
      .from(blogs)
      .where(ilike(blogs.title, `%${filter}%`))
      .orderBy(desc(blogs.likes))
  }

  return db.select().from(blogs).orderBy(desc(blogs.likes))
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({
    title,
    author,
    url,
    likes: 0,
  })
}

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}
