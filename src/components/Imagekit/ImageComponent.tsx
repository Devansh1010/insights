//import Image from 'next/image'
import { Image } from '@imagekit/next';

export default function Page({src, alt, height, width}: {src: string, alt: string, height: number, width: number}) {
    return (
        <Image
            urlEndpoint="https://ik.imagekit.io/your_imagekit_id" // New prop
            src={src}
            width={width}
            height={height}
            alt={alt}
        />
    )
}