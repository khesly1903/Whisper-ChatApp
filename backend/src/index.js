import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server} from "./lib/socket.js"

dotenv.config()



const PORT = process.env.PORT;

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




server.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

