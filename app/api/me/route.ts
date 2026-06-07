import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    return Response.json({ error: "invalid token" }, { status: 401 })
  }

  const token = authorization.replace("Bearer ", "")

  const user = await db.query.users.findFirst({
    where: eq(token),
  })

  if (!user) {
    return Response.json({ error: "invalid token" }, { status: 401 })
  }

  return Response.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}