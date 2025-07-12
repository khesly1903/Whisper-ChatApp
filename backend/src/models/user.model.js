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
        contacts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },
        

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;