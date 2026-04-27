//slug-generator with the help of title of the blog and current timestamp to make it unique
export function generateSlug(title: string): string {
    const timestamp = Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return `${slug}-${timestamp}`;
}