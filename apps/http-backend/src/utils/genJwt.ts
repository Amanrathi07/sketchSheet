
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({
    path:"../../.env"
})


export function genToken( userId :string ) {
    
    const token = jwt.sign(userId,process.env.SECRET!)
    return token
}


