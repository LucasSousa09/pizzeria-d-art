import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"

import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


import bcrypt from 'bcrypt'

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
          }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "lucas"},
                password: {label: "Password", type: "password"},
                email: {label: "Email", type:"text"}
            },
            async authorize(credentials) {
                // Check if email and password are valid
                if(credentials !== undefined && (!credentials.email || !credentials.password)) {
                    return null
                }

                //Check if the user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if(!user){
                    return null
                }

                //Check if the passwords match
                const passwordsMatch = await bcrypt.compare(credentials?.password || "", user.password || "")

                if(!passwordsMatch){
                    return null
                }

                return user
            }
        })    
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ user }) {
            const { name, email, image } = user

            try {
                const emailFound = await prisma.user.findUnique({
                    where: {
                        email: email || ''
                    }
                })

                if(user.avatar === undefined && emailFound && image && email && name){
                    await prisma.user.update({
                        where: {
                            email: email
                        },
                        data: {
                            avatar: image
                        }
                    })                                       
                }

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
            catch(err) {
                console.log(err)
                return false
            }
        },
        jwt: async ({token, user}) => {
            if(user && !user.name){
                token.name = user.username
                token.email = user.email

                if(user.avatar === null){
                    token.picture = user.avatar
                }
            }

            if(user && user.name){
                token.name = user.name
                token.email = user.email
            }

            return token
        },
        session: async ({session, token}) => {
            session.user = {
                name: token.name,
                image: token.picture
            }
            
            return session
        }
    },
    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET

}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
