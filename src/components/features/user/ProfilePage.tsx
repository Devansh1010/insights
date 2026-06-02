"use client"
import { SecurityCard } from './profile/SecurityCard'
import { Calendar, Camera, KeyRound, LogOut, Mail, Settings2, ShieldAlert, ShieldCheck, UserIcon } from 'lucide-react'
import { ProfileItem } from './profile/ProfileItem'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import EditProfile from './EditProfile'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/utils/me'
import { CenterScreen } from './profile/CneterScreen'

const ProfilePage = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getMe,
    })

    if (isPending) return <CenterScreen text="Loading profile..." />
    if (isError) return <CenterScreen text="Failed to load profile" error />

    return (
        <div className="min-h-screen bg-background">
            {/* MINIMAL TOP BANNER - Switched from gradients to a subtle border/muted look */}
            <div className="h-48 w-full border-b bg-muted/30" />

            <main className="max-w-4xl mx-auto px-6 -mt-24 pb-24 space-y-12">

                {/* PROFILE HEADER CARD */}
                <div className="bg-card rounded-[3rem] border shadow-sm p-10 flex flex-col items-center text-center space-y-6">

                    {/* Avatar with cleaner border */}
                    <div className="relative group">
                        <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-background shadow-xl ring-1 ring-border">
                            {data?.avatar ? (
                                <Image
                                    src={data.avatar}
                                    alt={data.username}
                                    height={200}
                                    width={200}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-4xl font-serif bg-muted text-muted-foreground">
                                    {data?.username?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                            <Camera className="text-white w-6 h-6" />
                        </div>
                    </div>

                    {/* Identity - Using font-serif per your theme */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3">
                            <h1 className="text-4xl font-serif font-bold tracking-tight">{data?.username}</h1>
                            {data?.isVerified ? (
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200/20">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Verified
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                    <ShieldAlert className="w-3 h-3 mr-1" />
                                    Unverified
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{data?.email}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <EditProfile />
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                            onClick={() => signOut()}
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* ACCOUNT DETAILS - Grid layout matching your SeriesList cards */}
                <div className="space-y-6">
                    <header className="px-2">
                        <h2 className="text-2xl font-serif font-bold tracking-tight">Account Details</h2>
                        <p className="text-muted-foreground">Information associated with your profile.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileItem icon={<UserIcon className="w-4 h-4" />} label="Username" value={data?.username} />
                        <ProfileItem icon={<Mail className="w-4 h-4" />} label="Email Address" value={data?.email} />
                        <ProfileItem icon={<Calendar className="w-4 h-4" />} label="Joined Date" value="March 2026" />
                        <ProfileItem icon={<Settings2 className="w-4 h-4" />} label="System Role" value="Developer" />
                    </div>
                </div>

                {/* SECURITY SECTION */}
                <div className="space-y-6">
                    <header className="px-2">
                        <h2 className="text-2xl font-serif font-bold tracking-tight">Security</h2>
                        <p className="text-muted-foreground">Maintain your account integrity.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SecurityCard
                            icon={<KeyRound className="w-5 h-5" />}
                            title="Change Password"
                            desc="Reset your login credentials"
                            href="/auth/forgot-password"
                        />
                        <SecurityCard
                            icon={<ShieldCheck className="w-5 h-5" />}
                            title="Two-Factor"
                            desc="Coming soon"
                            disabled
                        />
                    </div>
                </div>

            </main>
        </div>
    )
}

export default ProfilePage