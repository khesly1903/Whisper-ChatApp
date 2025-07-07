import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

dotenv.config()

const PORT = process.env.PORT;

// middlewares
app.use(express.json({ limit: "5mb" })); // extract data from body (req.body)
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser()) // to grap the cookies like req.cookies.jwt 
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://192.168.1.119:3000',  // Kendi IP'nizi yazın
        'http://localhost:5173',      // Vite kullanıyorsanız
        'http://192.168.1.119:5173'   // Vite için IP
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
// app.options('*', cors());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)




app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})

