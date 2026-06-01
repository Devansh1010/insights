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
        identifier: {
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
          return null
        }

        const email = credentials?.identifier as string
        const password = credentials?.password as string

        try {
          await dbConnect()

          const user = await User.findOne({
            $or: [{ email }, { username: email }]
          }).select("+password")

          if (!user) {
            return null
          }

          const isValid = await bcrypt.compare(password, user.password)

          if (!isValid) {
            return null
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
    async jwt({ token, user }) {

      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      //If user login with Github
      if (!token._id && token.email) {
        await dbConnect();

        const dbUser = await User.findOne({ email: token.email })
          .select('_id isVerified username');

        if (dbUser) {
          token._id = dbUser._id.toString();
          token.isVerified = dbUser.isVerified;
          token.username = dbUser.username;
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

        if (!user.email) {
          throw new Error(
            "GitHub account does not provide an email"
          );
        }

        await dbConnect()

        const existingUser
          = await User
            .findOne({ email: user.email })

        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email?.split("@")[0],
            avatar: user.image,
            provider: "github",
            isVerified: true
          })
        } else if (!existingUser.avatar) {
          // If user exists but has no avatar, update it with GitHub image
          existingUser.avatar = user.image;
          await existingUser.save();
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