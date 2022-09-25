import connectDB from '../../../utils/connectDB'
import Order from '../../../models/orderModel'
import auth from '../../../middleware/auth'
import Product from '../../../models/productModel'

connectDB()

export default async (req, res) => {
    switch(req.method) {
        case "POST":
            await createOrder(req, res)
            break;
        case "GET": 
            await getOrders(req, res)
            break;
    }
}

const createOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { address, phone, cart, total } = req.body

        const newOrder = new Order({
            user: result.id,
            address,
            phone, 
            cart, 
            total
        })

        await newOrder.save()

        cart.filter(item => {
            return sold(item._id, item.quantity, item.inStock, item.sold)
        })

        res.json({
            msg: "Payment success!",
            newOrder
        })

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Product.findOneAndUpdate({_id: id},
        {
            inStock: oldInStock - quantity,
            sold: quantity + oldSold
        }
    )
}

const getOrders = async (req, res) => {
    try {
        const result = await auth(req, res)

        let orders 

        if (result.role !== "admin") {
            orders = await Order.find({user: result.id}).populate("user", "-password")
        } else {
            orders = await Order.find().populate("user", "-password")
        }

        res.json({orders})
    } catch(err) {
        return res.status(500).json({
            error: err.message
        })   
    }
}