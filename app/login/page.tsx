"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "@/app/components/NotificationContext"

export default function LoginPage() {
  const {showNotification}=useNotification()
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else { showNotification("Login successful")
router.push("/")
router.refresh()
  }}

  return (
    <div className="mx-auto max-w-md rounded border bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>

      {error && (
        <p data-testid="error-message" className="mb-4 text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            Username
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              type="text"
              name="username"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              type="password"
              name="password"
              required
            />
          </label>
        </div>

        <button
          data-testid="login-button"
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  )
}