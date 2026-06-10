import Homepage from "./homepage.mdx"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ login?: string }>
}) {
  const { login } = await searchParams

  return (
    <div>
      {login === "success" && (
        <div
          data-testid="notification"
          className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700"
        >
          Login successful
        </div>
      )}

      <div className="markdown">
        <Homepage />
      </div>
    </div>
  )
}