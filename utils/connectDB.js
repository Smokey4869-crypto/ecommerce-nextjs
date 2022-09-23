import mongoose from "mongoose";

const connectDB = () => {
    // if (mongoose.connection[0].readyState) {
    //     console.log('Already connected.')
    // }

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to database.')
    })
}

export default connectDB