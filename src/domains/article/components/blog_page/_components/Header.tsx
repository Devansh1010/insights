import { TagBadge } from '@/components/features/badges/MetaBedge'
import { useArticle } from '@/domains/article/hooks/useArticle'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import ArticlePageLoader from './loader/ArticlePageLoader'
import { ArticleListError } from './error/ArticleListError'


const Header = ({ articleSlug }: { articleSlug: string }) => {

    const { article, isArticleFetching, isErrorOccured, refetchArticles } = useArticle(articleSlug)

     if (isArticleFetching) return <ArticlePageLoader />
    
        if (isErrorOccured) return <ArticleListError reset={refetchArticles} />

    return (
        <header className="relative w-full h-[60vh] md:h-[70vh] flex items-end">
            {/* Overlay Gradient for Text Legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent z-10" />

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={article.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                    alt="Cover"
                    className="w-full h-full object-cover"
                    width={1280}
                    height={720}

                />
            </div>

            {/* Hero Content */}
            <div className="container max-w-7xl mx-auto px-6 pb-12 relative z-20">
                <div className="flex gap-2 mb-4">
                    {article.tags?.map(
                        (tag: string, index: number) =>
                        (
                            <TagBadge key={index}>
                                {tag}
                            </TagBadge>
                        )
                    )}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8">
                    {article.title || "Blog Title"}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <Image
                            src={article.author.avatar || "https://ik.imagekit.io/devanshImagekit/user.png"}
                            alt="Author Avatar"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-foreground">{article.author?.username || "Author Name"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "March 18, 2026"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime || "12"} min read</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header