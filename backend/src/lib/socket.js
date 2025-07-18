import {Server} from "socket.io"
import http from "http"
import express from "express"


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        // origin:["http://192.168.1.119:5173"],
        origin:["http://localhost:5173"],
        credentials: true,
    }
})

export function getReceiverSocketId(userID)  {
    return userSocketMap[userID]
}

const userSocketMap = {} // key-value => userID-socketID

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userID = socket.handshake.query.userID
    if(userID) userSocketMap[userID] = socket.id
    io.emit("getOnlineUsers",Object.keys(userSocketMap)) // broadcast

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        delete userSocketMap[userID]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

    socket.on("contactRequest", (data) => {
        const receiverSocketID = getReceiverSocketId(data.receiverID)
        if(receiverSocketID) { 
            io.to(receiverSocketID).emit("newContactRequest", data)
        }
    })
})

export {io, app, server}