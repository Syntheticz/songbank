"use server";

import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient();

export async function isUserStored(): Promise<void> {
  const session = await getServerSession();
  const email = session?.user?.email || "";

  if (email === "") return;

  const users = await prisma.users.count({
    where: { email: email },
  });

  if (users < 1) {
    const user = await prisma.users.create({
      data: {
        email: email,
        isAdmin: false,
        password: null,
      },
    });
  }
}

export async function isUserAdmin(): Promise<boolean> {
  const session = await getServerSession();

  const user = await prisma.users.findFirst({
    where: { email: session?.user?.email || "" },
  });

  if (user?.isAdmin) {
    return true;
  } else {
    return false;
  }
}

export async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  const pass = await bcrypt.hash(password, 10);

  const user = await prisma.users.count({
    where: { email: email },
  });

  if (user > 0) return false;

  await prisma.users.create({
    data: {
      email: email,
      isAdmin: false,
      password: pass,
    },
  });

  return true;
}

export async function test({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log([email, password]);
}
