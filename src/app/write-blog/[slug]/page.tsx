// page.tsx
"use client"
import ArticleForm from "@/domains/article/components/write_article/ArticleForm"
import { use } from "react"

interface PageProps {
    params: Promise<{ slug: string }>
}

const Page = ({ params }: PageProps) => {

    const { slug } = use(params)

    return <ArticleForm slug={slug} />
}

export default Page