import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"

import { prisma } from "../../../../lib/prisma";

export const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",   
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
    }
})

export {handler as GET, handler as POST}