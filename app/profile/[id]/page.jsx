"use client"

import Profile from '@/components/Profile'
import React, { useEffect, useState } from 'react'

const SingleUserProfile = ({ params }) => {

    const userId = params.id

    const [info, setInfo] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()
            setPosts(data)
            console.log(data)
            setInfo(data[1].creator)
        }
        fetchPosts()
    }, [userId])

    console.log(info)

    return (
        <>
            <Profile
                name={info?.username}
                desc={`Welcome to ${info?.username} personalized profile page. Explore ${info?.username}'s exceptional prompts and be inspired by the power of their imagination`}
                data={posts}
            />
        </>

    )
}

export default SingleUserProfile
