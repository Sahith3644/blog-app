"use client"

import { useState } from "react"

export default function GenerateTokenButton({
  initialToken,
}: {
  initialToken: string | null
}) {
  const [latestToken, setLatestToken] = useState<string | null>(initialToken)

  const handleClick = () => {
    const token = `${crypto.randomUUID()}-${Date.now()}-${Math.random()}`
    setLatestToken(token)
  }

  return (
    <div>
      {latestToken && (
        <div data-testid="token-display">
          <code data-testid="api-token">{latestToken}</code>
        </div>
      )}

      <button
        type="button"
        data-testid="generate-token-button"
        onClick={handleClick}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        generate token
      </button>
    </div>
  )
}