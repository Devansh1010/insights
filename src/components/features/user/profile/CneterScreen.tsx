export function CenterScreen({ text, error }: { text: string; error?: boolean }) {
  return (
    <div className={`min-h-screen flex items-center justify-center font-serif text-lg ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
      {text}
    </div>
  )
}