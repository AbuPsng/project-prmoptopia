import promptModel from "@/models/promptModal"
import { connectToDb } from "@/utils/database"

export const GET = async (req, { params }) => {
    try {
        await connectToDb()

        const prompts = await promptModel.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 })
    }
}