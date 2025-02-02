import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerFormSchema } from "@/lib/schemas/registerSchema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const formValues = await req.json();
    const validateFormValues = registerFormSchema.parse(formValues);

    const hashedPassword = await bcrypt.hash(validateFormValues.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: validateFormValues.name,
        email: validateFormValues.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error Zod", message: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error response", message: error.message },
        { status: 500 }
      );
    }
  }
}
