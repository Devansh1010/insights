// page.tsx
"use client"
import BlogForm from "@/components/features/blogs/components/BlogForm"
import { use } from "react"

interface PageProps {
    params: Promise<{ blogId: string }>
}

const Page = ({ params }: PageProps) => {

    const { blogId } = use(params)

    return <BlogForm slug={blogId} />
}

export default Page