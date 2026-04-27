import BlogPage from "@/components/features/blogs/BlogPage";


interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {

    const { id } = await params;

    return (
        <BlogPage id={id} />
    )
}

export default Page
