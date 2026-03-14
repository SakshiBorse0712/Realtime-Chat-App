import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js" // as we are importing a local file, we have to add .js at the end 
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app , server } from "./lib/socket.js";

dotenv.config();

//const app = express();  delete this app and use socket app

const __dirname = path.resolve(); 

const PORT =  ENV.PORT || 5000;

// app.use(express.json()) // middleware  under req.body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin:ENV.CLIENT_URL , credentials:true }))
app.use(cookieParser())

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*" , (_,res) =>{
        res.sendFile(path.join(__dirname,"../frontend" , "dist" , "index.html"))
    })
} 

server.listen(PORT, ()=>{ 
    console.log("Server running on port " + PORT);
    connectDB();
}); 
