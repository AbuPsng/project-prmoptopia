"use client"

import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const MyProfilePage = () => {

    const { data: session } = useSession()
    const router = useRouter()

    const [posts, setPosts] = useState([])

    const handleEdit = async (post) => {
        router.push(`/update_prompt/${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                })

                const filterPosts = posts.filter(p => p._id !== post._id)
                setPosts(filterPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        if (session?.user.id) {
            fetchPosts()
        }
    }, [session])

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfilePage
