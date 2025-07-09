import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server} from "./lib/socket.js"

import path from "path"

dotenv.config()



const PORT = process.env.PORT;
const __dirname = path.resolve();

// middlewares
app.use(express.json({ limit: "5mb" })); // extract data from body (req.body)
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser()) // to grap the cookies like req.cookies.jwt 
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',      // Vite 
        "http://192.168.1.119:5173/",
        process.env.LOCAL_IP       // local
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
// app.options('*', cors());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

