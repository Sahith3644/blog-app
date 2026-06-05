<<<<<<< HEAD
import Link from "next/link"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/blogs">Blogs</Link> |{" "}
          <Link href="/users">Users</Link>
=======
import Link from "next/link";
export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html>
      <body>
        <nav>
          <Link href="/home">Home</Link>
          {"|"}
          <Link href="/about">About</Link>
          {"|"}
          <Link href="/contact">Contact Us</Link>
          {"|"}
>>>>>>> 9b9b0a4f7e3f6c46311ffe592eaa5f06ebbf39ec
        </nav>
        {children}
      </body>
    </html>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b9b0a4f7e3f6c46311ffe592eaa5f06ebbf39ec
