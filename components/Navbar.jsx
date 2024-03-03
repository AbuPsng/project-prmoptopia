"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

const Navbar = () => {

    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders()

            setProviders(response)
        }

        setUpProvider()
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={"/"}>
                <Image src={"/assets/images/logo.svg"} alt="Promptopia Logo" width={30} height={30} className="object-contain" />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}

            <div className="sm:flex hidden">
                {
                    session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href={"/create_prompt"} className="black_btn">
                                Create Post
                            </Link>

                            <button type="button" className="outline_btn" onClick={signOut}>
                                SignOut
                            </button>

                            <Link href={"/profile"}>
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="Profile"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={(provider.name)}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="Profile"
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                            {
                                toggleDropdown && (
                                    <div className="dropdown">
                                        <Link
                                            href={"/profile"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(prev => !prev)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href={"/create_prompt"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            Create Prompt
                                        </Link>

                                        <button
                                            type="button"
                                            className="mt-5 w-full black_btn"
                                            onClick={() => { setToggleDropdown(false); signOut() }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={(provider.name)}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

        </nav>
    )
}

export default Navbar
