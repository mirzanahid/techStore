import mongoose from "mongoose"


export const connectDB= async ()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb Connected : ${conn.connection.host}`)
        console.log(process.env.MONGO_URI)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1) // 1 mean failur and 0 mean success
    }
}