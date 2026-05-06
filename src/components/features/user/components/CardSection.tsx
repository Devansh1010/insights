export function CardSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">

            <div>
                <h2 className="text-sm uppercase tracking-widest text-zinc-400">
                    {title}
                </h2>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </div>
    )
}