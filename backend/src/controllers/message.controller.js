import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUsersForSidebar = async (req, res) => {

    try {
        // can directly accessable bcs this function is protected (next)
        const loggedInUserID = req.user._id

        // find the users NotEqual to logged in user id
        // and not select the passwords
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getUsersSidebar", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {

    try {
        // can directly accessable bcs this function is protected (next) like above func
        // renamed with senderID
        const senderID = req.user._id
        const { id: receiverID } = req.params // /:id

        const messages = await Message.find({
            $or: [ // gets all the messages: A -> B and B -> A
                {
                    senderID: senderID,
                    receiverID: receiverID
                },
                {
                    senderID : receiverID,
                    receiverID : senderID
                }
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const sendMessage = async (req,res) => {
    try {
        // can directly accessable bcs this function is protected (next)
        const senderID = req.user._id
        const {text, image} = req.body 
        const {id: receiverID} = req.params // route param: /send/:id

        // if message includes image
        let imageUrl
        if(image){
            //upload to cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        // create message
        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image:imageUrl
        })

        //save to db
        await newMessage.save()

        // realtime functionality
        const receiverSocketId = getReceiverSocketId(receiverID)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }


        res.status(200).json(newMessage)

    } catch (error) { 
        console.log("Error in sendMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }


}