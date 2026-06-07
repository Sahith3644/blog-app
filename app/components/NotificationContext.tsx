"use client"

import { createContext, useContext, useState } from "react"

type Notification = {
  message: string
  type: "success" | "error"
}

type NotificationContextType = {
  notification: Notification | null
  showNotification: (message: string, type?: "success" | "error") => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider")
  }

  return context
}