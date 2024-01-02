import { prisma } from "../lib/prisma"

export async function getProfileData(sessionEmail: string){
    if(sessionEmail.trim() === ''){
        return
    }
    try {
        const userProfile = await prisma.user.findUnique({
            where: {
                email: sessionEmail
            }
        })
    
        return userProfile
    }
    catch(err){
        console.log(err)
        return
    }
}