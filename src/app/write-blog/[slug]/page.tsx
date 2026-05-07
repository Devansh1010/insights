// page.tsx
"use client"
import BlogForm from "@/components/features/blogs/components/BlogForm"
import { use } from "react"

interface PageProps {
    params: Promise<{ slug: string }>
}

const Page = ({ params }: PageProps) => {

    const { slug } = use(params)

    return <BlogForm slug={slug} />
}

export default Page