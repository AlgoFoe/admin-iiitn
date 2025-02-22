import { useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import { Button } from "@heroui/button";
import useLogout from "@/hooks/useLogout";
import useAuthContext from "@/hooks/useAuthContext";
import { Link } from "@heroui/link";

export default function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { authUser } = useAuthContext()

    const { loading, logout } = useLogout()

    const protectedLinks = [
        { name: "Faculty", href: "/faculty" },
        { name: "Project", href: "/project" },
    ];

    const unprotectedLinks = [
        { name: "Login", href: "/login" },
        { name: "Signup", href: "/signup" }
    ]

    const handleLogout = async () => {
        await logout()
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-xl font-bold">
                        IIITN-ADMIN
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {authUser ?
                            (
                                <>
                                    {
                                        protectedLinks.map((link, index) => (
                                            <a key={index} href={link.href} className="text-gray-700 hover:text-blue-500">
                                                {link.name}
                                            </a>
                                        ))
                                    }
                                    < Button
                                        size='lg'
                                        fullWidth
                                        variant='flat'
                                        color='danger'
                                        onPress={handleLogout}
                                        isLoading={loading}
                                    >
                                        Login
                                    </Button>
                                </>
                            ) : (
                                unprotectedLinks.map((link, index) => (
                                    <a key={index} href={link.href} className="text-gray-700 hover:text-blue-500">
                                        {link.name}
                                    </a>
                                ))
                            )
                        }
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen &&
                    <div className="md:hidden flex flex-col space-y-4 py-4">
                        {
                            authUser ? (
                                <>
                                    {protectedLinks.map((link, index) => (
                                        <a key={index} href={link.href} className="text-gray-700 hover:text-blue-500">
                                            {link.name}
                                        </a>
                                    ))}
                                    {/* </div> */}
                                    <Link
                                        size='lg'
                                        fullWidth
                                        variant='flat'
                                        color='danger'
                                        onPress={handleLogout}
                                        isLoading={loading}
                                    >
                                        Login
                                    </Link>
                                </>
                            ) : (
                                unprotectedLinks.map((link, index) => (
                                    <a key={index} href={link.href} className="text-gray-700 hover:text-blue-500">
                                        {link.name}
                                    </a>
                                ))
                            )
                        }
                    </div>
                }
            </div>
        </nav >
    );
}
