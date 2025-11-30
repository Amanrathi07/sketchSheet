import express from"express";

import cors from "cors";

import { getDb } from "@repo/database"

const app = express() ;

app.use(cors())
app.use(express.json())




app.listen(3001,()=>{
    console.log("app is running on port 3001")
})