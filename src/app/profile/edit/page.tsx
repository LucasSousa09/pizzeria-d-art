import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth'

import { getProfileData } from '../../../utils/getProfileData'

import { Form } from '../../../components/Form'

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



export default async function EditProfile(){ 
    const session = await getServerSession()

    if(session){
        const profileData: ProfileDataProps = await getProfileData(session?.user?.email || '')
    
        return (
            <Form profileData={profileData}/>        
        )    
    }
    else{
        redirect('/login?error=session+error')
    }
}