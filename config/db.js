import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to MONGODB database ${conn.connection.host}`);
    } catch (err) {
        console.log(`error is ${err}`);
    }
}

export default connectDB;