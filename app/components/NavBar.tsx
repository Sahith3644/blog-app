"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-center gap-6 rounded-lg bg-blue-900 px-4 py-3">
      <Link href="/" className="font-medium text-blue-100 hover:text-white">
        home
      </Link>

      <Link href="/blogs" className="font-medium text-blue-100 hover:text-white">
        blogs
      </Link>

      <Link href="/users" className="font-medium text-blue-100 hover:text-white">
        users
      </Link>

      <Link href="/me" className="font-medium text-blue-100 hover:text-white">
        me
      </Link>

      {session ? (
        <>
          <Link
            href="/blogs/new"
            className="font-medium text-blue-100 hover:text-white"
          >
            create new
          </Link>

          <span className="text-sm text-white">
            {session.user?.name} logged in
          </span>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="font-medium text-blue-100 hover:text-white"
          >
            login
          </Link>

          <Link
            href="/register"
            className="font-medium text-blue-100 hover:text-white"
          >
            register
          </Link>
        </>
      )}
    </nav>
  )
}