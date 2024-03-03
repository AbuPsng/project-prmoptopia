"use client"

import Form from "@/components/Form"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdatePromptPage = () => {

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const router = useRouter()

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if (!promptId) return alert("Login first")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}

export default UpdatePromptPage
