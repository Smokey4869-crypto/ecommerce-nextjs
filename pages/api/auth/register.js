import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import validate from '../../../utils/validate'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password, confirmPassword } = req.body

        const err = validate(name, email, password, confirmPassword)
        if(err) return res.status(400).json({error: err})

        const user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({
                error: 'This email already exists.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({ 
            name, email, password: hashedPassword, confirmPassword 
        })

        await newUser.save()
        res.json({msg: "Congratulation, your account has been successfully created!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}