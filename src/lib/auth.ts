import { NextAuthOptions, getServerSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Log In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const dbUser = await prisma.users.findFirst({
          where: { email: credentials.email },
        });

        if (
          dbUser &&
          (await bcrypt.compare(credentials.password, dbUser.password || ""))
        ) {
          return dbUser as User;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
};
