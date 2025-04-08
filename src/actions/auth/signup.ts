"use server";

import { prisma } from "@/lib/db";
import { hashPass } from "@/lib/utils";
import { signupValidation } from "@/validations/auth";
import { z } from "zod";

const signupAction = async (data: z.infer<typeof signupValidation>) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPass(data.password),
        role: data.role,
      },
    });

    return {
      success: true,
      message: "User created successfully!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export default signupAction;
