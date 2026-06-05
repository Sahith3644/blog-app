import { createBlog } from "@/app/actions/blog"

export default function NewBlogPage() {
  return (
    <main>
      <h1>Create a new blog</h1>

      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>

        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>

        <div>
          <label>
            URL
            <input type="text" name="url" required />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </main>
  )
}
