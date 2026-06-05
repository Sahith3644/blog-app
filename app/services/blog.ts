<<<<<<< HEAD
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
=======
const blog=[{
    id:1,content:"DAILY BLOGS",like:"100",title:"Hello"
},
{
    id:2,content:"BLOGS HELP TO MEMORIZE",like:"200",title:"Hello World"
}]
        let nextid=3

        export const getBlog=()=>{
            return blog
        }

        export const addBlog=(content:string,like:string,title:string)=>{
            blog.push({id:nextid++,content,like,title})
        }
>>>>>>> 9b9b0a4f7e3f6c46311ffe592eaa5f06ebbf39ec
