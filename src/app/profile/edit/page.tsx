import { getServerSession } from 'next-auth'

import { Form } from '../../../components/Form'
import { prisma } from '../../../lib/prisma'

export type ProfileDataProps = { 
    id: string;
    email: string; 
    username: string; 
    avatar: string | null; 
    cpf: string | null; 
    phone: string | null; 
    street: string | null; 
    district: string | null; 
    zipCode: string | null;  
    houseNumber: number | null;
    complement: string | null;
    city: string | null;
    state: string | null;
    reference: string | null; 
} | null | undefined

async function getProfileData(sessionEmail: string){
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
    catch{
        return
    }
}

export default async function EditProfile(){ 
    const session = await getServerSession()

    const profileData: ProfileDataProps = await getProfileData(session?.user?.email || '')

    return (
        <Form profileData={profileData}/>        
    )
}