import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const auth = async (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(400).json({
            error: "Invalid Authentication"
        })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

    if (!decoded) {
        return res.status(400).json({
            error: "Invalid Authentication"
        })
    }

    const user = await User.findOne({
        _id: decoded.id
    })

    return {
        id: user._id
    }
}

export default auth