"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./theme"
import { useSession } from "next-auth/react"

export function Navbar() {

    const { data: session } = useSession()

    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    // High-end interaction: Hide/Show border on scroll
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Explore", href: "/user/explore" },
        { name: "My Blogs", href: "/user/my-blogs" },
        { name: "My Series", href: "/user/series" },
        { name: "Profile", href: "/user/profile" },
    ]

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b",
            scrolled
                ? "bg-background/80 backdrop-blur-xl border-border py-3"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* LOGO SECTION */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-serif font-bold text-xl tracking-tighter group-hover:opacity-70 transition-opacity">
                        Insights<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-4 w-px bg-border mx-2" />


                    {
                        session?.user ? (
                            <Link href="/write-blog">
                                <Button variant="outline" size="sm">
                                    Write a Story
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/auth/signin">
                                <Button size="sm" className="rounded-full px-5 font-bold text-xs uppercase tracking-widest">
                                    Sign In
                                </Button>
                            </Link>
                        )
                    }


                    {/* Theme Toggle */}
                    <div className="">
                        <ModeToggle />
                    </div>
                </div>

                {/* MOBILE TOGGLE */}
                <div className="md:hidden flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            {
                isOpen && (
                    <div className="absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top-2 duration-300 md:hidden">
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-serif font-bold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button className="w-full mt-4 rounded-xl">Write a Story</Button>
                        </div>
                    </div>
                )
            }
        </nav >
    )
}