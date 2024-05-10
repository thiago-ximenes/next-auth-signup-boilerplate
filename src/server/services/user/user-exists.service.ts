import {db} from "~/server/db";
import {eq} from "drizzle-orm";
import {users} from "~/server/db/schema";

export default async function userExistsService(email: string) {
  const user = await db
    .query
    .users
    .findFirst({
      where: eq(users.email, email),
    })

  return !!user;
}