"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { notification } = useNotification()

  if (!notification?.message) return null

  return (
    <div
      data-testid="notification"
      className={`mx-auto mt-4 max-w-xl rounded px-4 py-3 text-center font-semibold ${
        notification.type === "error"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {notification.message}
    </div>
  )
}