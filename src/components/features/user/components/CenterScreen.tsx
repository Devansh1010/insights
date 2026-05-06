export function CenterScreen({ text, error }: { text: string; error?: boolean }) {
    return (
        <div className={`min-h-screen flex items-center justify-center ${error ? 'text-red-500' : ''}`}>
            {text}
        </div>
    )
}