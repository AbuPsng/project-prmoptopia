import promptModel from "@/models/promptModal"

export const GET = async (req, { params }) => {
    const { keyword } = params

    console.log(keyword)
    try {
        const prompts = await promptModel.find({
            $or: [
                { prompt: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for the title
                { tag: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for the description
                { "creator.username": { $regex: keyword, $options: 'i' } } // Case-insensitive search for the creator's name
            ],
        }).populate({ path: "creator", model: "User" })

        if (!prompts) return new Response("No prompts found with such content", { status: 200 })

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all the prompts", { status: 500 })
    }
}