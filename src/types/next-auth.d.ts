import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
      token?: string;
      userRole?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    token?: string;
    phone?: string;
    userRole?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    accessToken?: string;
    phone?: string;
    userRole?: string;
  }
}
