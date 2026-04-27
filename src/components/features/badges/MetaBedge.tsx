import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 1. Level Component: Uses semantic logic for visual weight
export const LevelBadge = ({title}: {title: string}) => {
  return (
    <Badge 
      variant="outline" 
      className={cn("font-sans text-[10px] uppercase px-3 py-0")}
    >
      {title}
    </Badge>
  )
}

// 2. Tag Component: Clean, Minimalist, Identical everywhere
export const TagBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <Badge 
      variant="secondary" 
      className="bg-muted/50 text-muted-foreground hover:bg-muted text-[10px] font-medium tracking-tight px-2 py-0 border-transparent transition-colors"
    >
      # {children}
    </Badge>
  )
}