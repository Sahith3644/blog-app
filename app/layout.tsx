import Link from "next/link"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            textAlign: "center",
            padding: "20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h1>BLOG APP</h1>

          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/users">Users</Link>
          </nav>
        </header>

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  )
}