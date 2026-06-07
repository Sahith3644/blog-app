"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { notification } = useNotification()

  if (!notification) return null

  return (
    <div
      className={`mx-auto mt-4 max-w-xl rounded-md px-4 py-3 text-center font-medium ${
        notification.type === "error"
          ? "bg-red-100 text-red-700 border border-red-300"
          : "bg-green-100 text-green-700 border border-green-300"
      }`}
    >
      {notification.message}
    </div>
  )
}