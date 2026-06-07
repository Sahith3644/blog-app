import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import Notification from "./components/Notification"
import { NotificationProvider } from "./components/NotificationContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AuthSessionProvider>
          <NotificationProvider>
           <header className="bg-blue-900 px-6 py-5 text-center shadow-md">
  <h1 className="mb-4 text-4xl font-bold tracking-wide text-white">
    BLOG APP
  </h1>

  <NavBar />
</header>

            <Notification />

            <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}