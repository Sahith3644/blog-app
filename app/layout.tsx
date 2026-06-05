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
        </nav>
        {children}
      </body>
    </html>
  )
}