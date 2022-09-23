import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import validate from '../../../utils/validate'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await signin(req, res)
            break;
    }
}

const signin = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({
            error: 'This user does not exist'
        })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                error: 'Incorrect password.'
            })
        }

        const accessToken = createAccessToken({id: user._id})
        const refreshToken = createRefreshToken({id: user._id})

        res.json({
            msg: "Login Success",
            refreshToken,
            accessToken,
            user: user
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}