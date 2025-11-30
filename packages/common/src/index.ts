import {z} from "zod" ;

export const signupCheck = z.object({
    name : z.string().min(3).max(30) ,
    email : z.email().min(3).max(30) ,
    password : z.string().min(3).max(30)
})

export const signinCheck = z.object({
    email : z.email().min(3).max(30) ,
    password : z.string().min(3).max(30)
})