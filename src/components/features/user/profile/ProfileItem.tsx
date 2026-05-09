export function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-colors group">
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                {icon}
                {label}
            </div>
            <p className="text-lg font-medium tracking-tight">{value || "—"}</p>
        </div>
    )
}