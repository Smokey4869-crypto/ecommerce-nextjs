import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user' 
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  cart: {
    type: Array
  },
  total: {
    type: Number
  },
  delivered: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean, 
    default: false
  },
  dateOfPayment: Date
}, {
    timestamps: true
})

module.exports = mongoose.models.order || mongoose.model('order', orderSchema)