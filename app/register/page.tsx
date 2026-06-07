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
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <input
          name="username"
          placeholder="Username"
          defaultValue={state.values.username}
        />
        {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}

        <input
          name="name"
          placeholder="Name"
          defaultValue={state.values.name}
        />

        <input type="password" name="password" placeholder="Password" />
        {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}

        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
        />
        {state.errors.passwordConfirm && (
          <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}