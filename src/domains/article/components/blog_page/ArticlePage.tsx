'use client'
import Article from '@/domains/article/components/blog_page/_components/Article'
import { getBlog } from '@/services/blog.service'
import { useQuery } from '@tanstack/react-query'
import Header from '@/domains/article/components/blog_page/_components/Header'

import { ArticleListError } from './_components/error/ArticleListError'
import ArticlePageLoader from './_components/loader/ArticlePageLoader'

const ArticlePage = ({ slug }: { slug: string }) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['blog', { slug }],
        queryFn: () => getBlog(slug),
    })

    if (isPending) return <ArticlePageLoader />

    if (isError) return <ArticleListError reset={refetch} />

    return (
        <div className="min-h-screen bg-background">
            <Header blog={data} />

            <Article blog={data} />
        </div>
    )
}

export default ArticlePage