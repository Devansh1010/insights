// layout.tsx
import { Navbar } from "@/components/navbar";
import Providers from "@/utils/provider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${inter.className} antialiased bg-[#fafafa] dark:bg-[#050505] text-foreground`}>
            <Providers>
                <Navbar />
                {children}
            </Providers>
        </div>
    );
}