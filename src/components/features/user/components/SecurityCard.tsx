import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function SecurityCard({ icon, title, desc, href, disabled }: { icon: React.ReactNode; title: string; desc: string; href?: string; disabled?: boolean }) {

  const content = (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition
      ${disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:shadow-md hover:border-primary/40 cursor-pointer'
      }`}>

      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {icon}
        </div>

        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-zinc-500">{desc}</p>
        </div>
      </div>

      {!disabled && <ChevronRight />}
    </div>
  )

  if (href && !disabled) return <Link href={href}>{content}</Link>
  return content
}