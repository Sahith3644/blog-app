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
    <div className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-center text-2xl font-bold">Create a new blog</h2>

      <form className="space-y-4" action={formAction}>
        <div>
          <input
            className="w-full rounded border px-3 py-2"
            name="title"
            placeholder="Title"
            defaultValue={state.values.title}
          />
          {state.errors.title && (
            <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
          )}
        </div>

        <div>
          <input
            className="w-full rounded border px-3 py-2"
            name="author"
            placeholder="Author"
            defaultValue={state.values.author}
          />
          {state.errors.author && (
            <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>
          )}
        </div>

        <div>
          <input
            className="w-full rounded border px-3 py-2"
            name="url"
            placeholder="URL"
            defaultValue={state.values.url}
          />
          {state.errors.url && (
            <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
          )}
        </div>

        <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  )
}