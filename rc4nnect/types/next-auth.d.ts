import { UserRole } from "@prisma/client"
import NextAuth, { User } from "next-auth"

declare module 'next-auht/jwt' {
  interface JWT {
    id: string
    role: UserRole
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      role: UserRole
    }
  }
}