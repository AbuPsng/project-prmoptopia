import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) return

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })

        isConnected = true
        console.log("MongoDB connected")
    } catch (error) {
        console.log("unable to connect the mongodb")
        console.log(error)
    }
}