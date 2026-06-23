import ArticlePage from "@/domains/article/components/blog_page/ArticlePage";
interface PageProps {
    params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {

    const { slug } = await params;

    return (
        <ArticlePage slug={slug} />
    )
}

export default Page
