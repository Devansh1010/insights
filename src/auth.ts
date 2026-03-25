import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import { dbConnect } from '@/lib/db'
import User from './models/user_models/user.model'
import bcrypt from 'bcryptjs'

export const { handlers, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    Credentials({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
      },

      authorize: async (credentials) => {

        if (!credentials) {
          throw new Error("No credentials provided")
        }

        const email = credentials?.email as string
        const password = credentials?.password as string

        try {
          await dbConnect()

          const user = await User.findOne({
            $or: [{ email }, { username: email }]
          }).select("+password")

          if (!user) {
            throw new Error('No user found')
          }

          const isValid = await bcrypt.compare(password, user.password)

          if (!isValid) {
            throw new Error('Not authorized')
          }

          const updatedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }

          return updatedUser

        } catch (error) {
          console.error('Authorization Error:', error)
          throw new Error('Error checking user')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      //If user login with Github
      if (account?.provider === "github" && !token._id) {
        await dbConnect();
        const dbUser = await User.findOne({ email: token.email })
          .select('_id isVerified username');
        if (dbUser) {
          token._id = dbUser._id.toString();
          token.isVerified = dbUser.isVerified;
          token.username = dbUser.username
        }
      }
      return token;
    },

    session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id as string
        session.user.email = token.email as string
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    },

    async signIn({ user, account }) {

      if (account?.provider === "github") {

        await dbConnect()

        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {

          await User.create({
            email: user.email,
            username: user.name,
            image: user.image,
            provider: "github",
            isVerified: true
          })

        }

      }

      return true
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
})