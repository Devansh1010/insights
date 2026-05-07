import SeriesPage from "@/components/features/series/SeriesPage";


interface PageProps {
    params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {

    const { slug } = await params;

    return (
        <div><SeriesPage slug={slug} /></div>
    )
}

export default Page