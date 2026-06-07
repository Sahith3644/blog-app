"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-center gap-6 rounded-lg bg-blue-900 py-3 px-4">
      <Link
        href="/"
        className="font-medium text-blue-100 transition hover:text-white"
      >
        Home
      </Link>

      <Link
        href="/blogs"
        className="font-medium text-blue-100 transition hover:text-white"
      >
        Blogs
      </Link>

      <Link
        href="/users"
        className="font-medium text-blue-100 transition hover:text-white"
      >
        Users
      </Link>

      <Link
        href="/me"
        className="font-medium text-blue-100 transition hover:text-white"
      >
        Me
      </Link>

      {session ? (
        <>
          <Link
            href="/blogs/new"
            className="font-medium text-blue-100 transition hover:text-white"
          >
            Create Blog
          </Link>

          <span className="text-sm text-white">
            {session.user?.name} logged in
          </span>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-500"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="font-medium text-blue-100 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="font-medium text-blue-100 transition hover:text-white"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  )
}