'use client'
import Header from './components/blog-page/Header'
import Article from './components/blog-page/Article'
import { getBlog } from '@/services/blog.service'
import { useQuery } from '@tanstack/react-query'
import BlogPageLoader from './loader/BlogPageLoader'
import { BlogListError } from './error/BlogsListError'

const BlogPage = ({ slug }: { slug: string }) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['blog', { slug }],
        queryFn: () => getBlog(slug),
    })

    if (isPending) return <BlogPageLoader />

    if (isError) return <BlogListError reset={refetch} />

    return (
        <div className="min-h-screen bg-background">
            <Header blog={data} />

            <Article blog={data} />
        </div>
    )
}

export default BlogPage