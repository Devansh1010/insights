import BlogPage from "@/components/features/blogs/BlogPage";


interface PageProps {
    params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {

    const { slug } = await params;

    return (
        <BlogPage slug={slug} />
    )
}

export default Page
