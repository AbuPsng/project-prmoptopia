"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map((post) => (
                    <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
                ))
            }
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchText) return
        try {
            const response = await fetch(`/api/prompt/search/${searchText}`)
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchByTag = async (tag) => {
        if (!tag) return
        try {
            setSearchText(tag)
            const response = await fetch(`/api/prompt/search/${tag}`)
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/prompts/all")
            const data = await response.json()
            setPosts(data)
            console.log(data, "feed data by fetchPosts")
            setSearchText("")
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    className="search_input peer"
                />
                <button className="ml-4 p-2 font-semibold " onClick={handleSearch}>
                    search
                </button>
                <button type="reset" className="ml-4 p-2 font-semibold " onClick={fetchPosts}>
                    Reset
                </button>
            </form>

            {
                posts.length < 1 && "No prompt with such content"
            }

            <PromptCardList data={posts} handleTagClick={handleSearchByTag} />
        </section>
    )
}

export default Feed
