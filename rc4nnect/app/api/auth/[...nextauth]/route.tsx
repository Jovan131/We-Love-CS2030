import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/db";
import { compare } from 'bcrypt'
import { Resident } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prisma.resident.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          throw new Error('No such user found')
        }

        if (!user.active) {
          throw new Error('Please activate your account')
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Incorrect password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }

      }
    })
  ],

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as Resident
        return {
          ...token,
          id: u.id
        }
      }
      return token
    }
  },

  pages: {
    signIn:"/login"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }