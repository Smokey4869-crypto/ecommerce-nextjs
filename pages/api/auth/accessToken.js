import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(400).json({
                error: "Please login now!"
            })
        }

        const result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        if (!result) {
            return res.status(400).json({
                error: "Your token is incorrect or has expired."
            })
        }

        const user = await User.findById(result.id)
        if (!user) {
            return res.status(400).json({
                error: "User does not exist."
            })
        }

        const accessToken = createAccessToken({
            id: user._id
        })
        res.json({
            accessToken,
            user: user
        })

    } catch (err) {
        return res.status(500).json({
            error: error.message
        })
    }
}

