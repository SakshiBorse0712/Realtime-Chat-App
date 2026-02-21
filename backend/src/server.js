import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js" // as we are importing a local file, we have to add .js at the end 
import messageRoutes from "./routes/message.route.js"

dotenv.config();

const app = express();

const PORT =  process.env.PORT || 3000;

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);


app.listen(PORT, ()=> console.log("Server running on port " + PORT)); 
