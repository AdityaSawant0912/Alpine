import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import executeQuery from "@/lib/db";
import { getSession } from "next-auth/react"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export async function isNotVerified(userId){
    let res = await executeQuery({
        query: `SELECT user_role_id FROM user_auth where user_id=? LIMIT 1`,
        values: [userId]
    })
    if(res.length < 1) return false;
    if(res[0].user_role_id === 3) return true;
    return false;
}

export async function isVendor(userId){
    let res = await executeQuery({
        query: `SELECT user_role_id FROM user_auth where user_id=? LIMIT 1`,
        values: [userId]
    })
    if(res.length < 1) return false;
    if(res[0].user_role_id === 2) return true;
    return false;
    
}
export async function isAdmin(userId){
    let res = await executeQuery({
        query: `SELECT user_role_id FROM user_auth where user_id=? LIMIT 1`,
        values: [userId]
    })
    if(res.length < 1) return false;
    if(res[0].user_role_id <= 1) return true;
    return false;
    
}

export async function isSuperAdmin(userId){
    let res = await executeQuery({
        query: `SELECT user_role_id FROM user_auth where user_id=? LIMIT 1`,
        values: [userId]
    })
    if(res.length < 1) return false;
    if(res[0].user_role_id === 0) return true;
    return false;
    
}

export async function adminGSSP(context, args={}){
    const session = await getSession(context)
    if (!session || !await isAdmin(session.user.user_id)){
        
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                }
            }
        
    }
    return {
        props: { session, ...args },
        
    }
}