export function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">

            <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest mb-1">
                {icon}
                {label}
            </div>

            <p className="text-base font-semibold">{value || "—"}</p>
        </div>
    )
}