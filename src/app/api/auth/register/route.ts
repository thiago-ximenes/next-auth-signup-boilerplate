import {type NextRequest, NextResponse} from "next/server";
import createUserSchema from "~/schemas/auth/create-user.schema";
import HttpStatusEnum from "~/enum/http-status.enum";
import userExistsService from "~/server/services/user/user-exists.service";

export async function POST(req: NextRequest) {
  const result = createUserSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json(result.error, {
      status: HttpStatusEnum.UNPROCESSABLE_ENTITY,
    });
  }

  const userExists = await userExistsService(result.data.email);

  if (userExists) {
    return NextResponse.json("User already exists", {
      status: HttpStatusEnum.CONFLICT,
    });
  }

  return NextResponse.json("User created", {
    status: HttpStatusEnum.CREATED,
  });
}