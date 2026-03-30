import SeriesPage from "@/components/features/series/SeriesPage";


interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {

    const { id } = await params;

    return (
        <div><SeriesPage id={id} /></div>
    )
}

export default Page