import { signIn } from "next-auth/react"

import { Dispatch, ReactNode, SetStateAction } from "react"

type LoginButtonProps = {
    color?: string,
    children: ReactNode,
    callbackUrl?: string,
    isAwaitingResponse: string | null,
    loginProvider: "github" | "google" | "credentials",
    setIsAwaitingResponse: Dispatch<SetStateAction<string | null>>
}

export function LoginButton({ children, isAwaitingResponse, loginProvider, callbackUrl="/", color="primary",setIsAwaitingResponse}: LoginButtonProps){
    function handleLogin(){
        if(loginProvider === "github" || loginProvider === "google"){
            setIsAwaitingResponse(loginProvider)
            signIn(loginProvider, {callbackUrl})
        }
    }
    
    return (
        <button
            disabled={loginProvider === isAwaitingResponse}
            onClick={handleLogin} 
            className={ 
                "group flex items-center justify-center gap-3 sm:gap-5 w-full rounded " +
                "mb-8 py-3 sm:py-4 px-5 " +
                `text-lg sm:text-xl lg:text-2xl  font-medium text-background ${color === "primary" ? "bg-primary" : "bg-[#333]"} ` +
                "hover:opacity-75 transition-opacity ease-linear active:scale-95 " +
                "disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:opacity-100 " +
                `${loginProvider !== "credentials" ? "mt-0" : "mt-8"}`
            }
        >   
            {children}
        </button>
    )
}