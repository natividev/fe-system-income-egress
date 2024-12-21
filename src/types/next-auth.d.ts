/* eslint-disable @typescript-eslint/no-unused-vars */
/* import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
  }
} */

import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends NextAuthSession {
    accessToken?: string;
  }

  interface User extends NextAuthUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
  }
}
