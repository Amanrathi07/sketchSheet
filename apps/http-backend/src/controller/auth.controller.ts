import { Request, Response } from 'express';
import { genToken } from '../utils/genJwt.js';



export async function singup(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in signup function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}

export async function singin(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in signin function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}


export async function myData(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in myData function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}


export async function allUser(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in allUser function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}

export async function updateUser(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in updateUser function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}


export async function deleateUser(req:Request, res:Response) {
    try {
        
    } catch (error) {
        console.log("error in deleateUser function ", error);
        return res.status(500).json({message:"internal server error"})
    }
}