import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 20
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePic: {
            type: String,
            default: ""
        },
        contacts: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            lastMessage: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: null
            },
            lastMessageTime: {
                type: Date,
                default: Date.now
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }],
        contactRequests: {
            sent:[{
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:true
                },
                sentAt:{
                    type:Date,
                    default:Date.now
                }
            }],
            received:[{
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    red:"User",
                    requied:true
                },
                received:{
                    type:Date,
                    default:Date.now
                }
            }]
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;