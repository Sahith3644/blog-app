"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blog"

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

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
}

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div className="mx-auto max-w-md rounded border bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Create a new blog</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label>
            Title
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              name="title"
              defaultValue={state.values.title}
            />
          </label>
          {state.errors.title && (
            <p data-testid="title-error" className="text-red-600">
              {state.errors.title}
            </p>
          )}
        </div>

        <div>
          <label>
            Author
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              name="author"
              defaultValue={state.values.author}
            />
          </label>
          {state.errors.author && (
            <p data-testid="author-error" className="text-red-600">
              {state.errors.author}
            </p>
          )}
        </div>

        <div>
          <label>
            URL
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              name="url"
              defaultValue={state.values.url}
            />
          </label>
          {state.errors.url && (
            <p data-testid="url-error" className="text-red-600">
              {state.errors.url}
            </p>
          )}
        </div>

        <button
          data-testid="create-blog-button"
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create
        </button>
      </form>
    </div>
  )
}