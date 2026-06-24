'use client'

import Article from '@/domains/article/components/blog_page/_components/Article'
import Header from '@/domains/article/components/blog_page/_components/Header'


const ArticlePage = ({ slug }: { slug: string }) => {

    return (
        <div className="min-h-screen bg-background">
            <Header articleSlug={slug} />

            <Article articleSlug={slug} />
        </div>
    )
}

export default ArticlePage