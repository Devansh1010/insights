// Frontend Type
export type Series = {
    _id: string,
    author: { username: string, avatar: string },
    title: string,
    slug: string,
    desc: string,
    tags: string[],
    coverImage: string,
    createdAt: Date
}