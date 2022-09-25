import connectDB from '../../../utils/connectDB'
import Order from '../../../models/orderModel'
import auth from '../../../middleware/auth'
import Product from '../../../models/productModel'

connectDB()

export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await payOrder(req, res)
            break;
    }
}

const payOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {id} = req.query
        
        await Order.findOneAndUpdate({_id: id},
            {
                paid: true, 
                dateOfPayment: new Date().toString()
            })

        res.json({
            msg: 'Payment success!'
        })
    } catch(err) {
        return res.status(500).json({
            error: err.message
        })
    }
}