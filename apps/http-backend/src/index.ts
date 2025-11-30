import express from"express";
import cors from "cors";

import authRoter from "./routes/auth.routes.ts";

const app = express() ;

app.use(cors())
app.use(express.json())


app.use("/v1/auth",authRoter)

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})