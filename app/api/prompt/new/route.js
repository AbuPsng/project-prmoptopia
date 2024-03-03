import promptModel from "@/models/promptModal"
import { connectToDb } from "@/utils/database"

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDb()
        const newPrompt = await promptModel.create({
            creator: userId,
            prompt,
            tag
        })

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}