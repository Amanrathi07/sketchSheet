import express from"express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoter from "./routes/auth.routes.ts";
import roomRouter from "./routes/room.routes.ts";

const app = express() ;

app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())




app.use("/v1/auth",authRoter)
app.use("/v1/room",roomRouter)


app.listen(3000,()=>{
    console.log("app is running on port 3000")
})