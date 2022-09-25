import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    root: {
        type: Boolean, 
        default: false
    },
    avatar: {
        type: String, 
        default: 'https://res.cloudinary.com/dhlz4gold/image/upload/v1663346033/Sydney_Opera_House_cropped_p8xjhb.jpg'
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.user || mongoose.model('user', userSchema)
