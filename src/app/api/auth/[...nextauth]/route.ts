import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";

import { prisma } from "@/lib/prisma";

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",   
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          })     
    ],
    callbacks: {
        async signIn({ user }) {
            const { name, email, image } = user
            try {
                const emailFound = await prisma.user.findUnique({
                    where: {
                        email: email || ''
                    }
                })

                if(emailFound === null){
                    if(email && name){
                        await prisma.user.create({
                            data:{
                                email: email,
                                username: name,
                                avatar: image
                            }
                        })
                    }
                }

                return true
            }
            catch {
                return false
            }
        },
    },

}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}