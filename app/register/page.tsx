"use client"

import { useActionState } from "react"
import { registerUser } from "@/app/actions/users"

type RegisterState = {
  errors: {
    username?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values: {
    username: string
    name: string
  }
}

const initialState: RegisterState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="mx-auto max-w-md rounded border bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label>
            Username
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              name="username"
              defaultValue={state.values.username}
            />
          </label>
          {state.errors.username && (
            <p data-testid="username-error" className="text-red-600">
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label>
            Name
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              name="name"
              defaultValue={state.values.name}
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
            />
          </label>
          {state.errors.password && (
            <p data-testid="password-error" className="text-red-600">
              {state.errors.password}
            </p>
          )}
        </div>

        <div>
          <label>
            Confirm Password
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              type="password"
              name="passwordConfirm"
            />
          </label>
          {state.errors.passwordConfirm && (
            <p data-testid="passwordConfirm-error" className="text-red-600">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        {state.errors.general && (
          <p data-testid="error-message" className="text-red-600">
            {state.errors.general}
          </p>
        )}

        <button
          data-testid="register-button"
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Register
        </button>
      </form>
    </div>
  )
}