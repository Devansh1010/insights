'use client'

import Article from '@/domains/article/components/blog_page/_components/Article'
import Header from '@/domains/article/components/blog_page/_components/Header'
import { useArticle } from '@/domains/article/hooks/useArticle';

import ArticlePageLoader from './_components/loader/ArticlePageLoader';
import { ArticleListError } from './_components/error/ArticleListError';


const ArticlePage = ({ slug }: { slug: string }) => {

    const { article, isArticleFetching, isErrorOccured, refetchArticles } = useArticle(slug);

    if (isArticleFetching) { return <ArticlePageLoader /> };

    if (isErrorOccured) { return <ArticleListError reset={refetchArticles} /> };
    return (
        <div className="min-h-screen bg-background">
            <Header articleSlug={slug} />

            <Article article={article} />
        </div>
    )
}

export default ArticlePage