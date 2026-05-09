import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function SecurityCard({ icon, title, desc, href, disabled }: { icon: React.ReactNode; title: string; desc: string; href?: string; disabled?: boolean }) {
  const content = (
    <div className={`flex items-center justify-between p-6 rounded-2xl border bg-card transition-all
      ${disabled 
        ? 'opacity-40 cursor-not-allowed' 
        : 'hover:border-foreground/20 hover:shadow-sm cursor-pointer'
      }`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-muted">
          {icon}
        </div>
        <div>
          <p className="font-bold tracking-tight">{title}</p>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      {!disabled && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
    </div>
  )

  if (href && !disabled) return <Link href={href}>{content}</Link>
  return content
}