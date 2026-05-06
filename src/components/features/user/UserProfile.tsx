'use client'
import { getMe } from '@/utils/me'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { CenterScreen } from './components/CenterScreen'
import Image from 'next/image'
import { Calendar, Camera, KeyRound, LogOut, Mail, Settings2, ShieldAlert, ShieldCheck, UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import EditProfile from './EditProfile'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { CardSection } from './components/CardSection'
import { ProfileItem } from './components/ProfileItem'
import { SecurityCard } from './components/SecurityCard'

const UserProfile = () => {

    const { data, isPending, isError } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getMe,
    })

    if (isPending) {
        return <CenterScreen text="Loading profile..." />
    }

    if (isError) {
        return <CenterScreen text="Failed to load profile" error />
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">

            {/* TOP BANNER */}
            <div className="h-48 w-full bg-linear-to-r from-primary/20 via-purple-500/20 to-blue-500/20" />

            <main className="max-w-4xl mx-auto px-6 -mt-24 pb-24 space-y-10">

                {/* PROFILE CARD */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center text-center space-y-6">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-lg">

                            {data?.avatar ? (
                                <Image
                                    src={data.avatar}
                                    alt={data.username}
                                    height={200}
                                    width={200}
                                    className="h-50 w-50 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-3xl font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                                    {data?.username?.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <Camera className="text-white w-5 h-5" />
                        </div>
                    </div>

                    {/* Name + badge */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3">
                            <h1 className="text-2xl font-bold">{data?.username}</h1>

                            {data?.isVerified ? (
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Verified
                                </Badge>
                            ) : (
                                <Badge className="bg-yellow-500/10 text-yellow-500 border-none">
                                    <ShieldAlert className="w-3 h-3 mr-1" />
                                    Not Verified
                                </Badge>
                            )}
                        </div>

                        <p className="text-zinc-500 text-sm">{data?.email}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <EditProfile />

                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full hover:text-destructive"
                            onClick={() => signOut()}
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* DETAILS */}
                <CardSection title="Account Details" description="Your account information">

                    <ProfileItem icon={<UserIcon />} label="Username" value={data?.username} />
                    <ProfileItem icon={<Mail />} label="Email" value={data?.email} />
                    <ProfileItem icon={<Calendar />} label="Joined" value="March 2026" />
                    <ProfileItem icon={<Settings2 />} label="Role" value="Developer" />

                </CardSection>

                {/* SECURITY */}
                <CardSection title="Security" description="Manage your account security">

                    <SecurityCard
                        icon={<KeyRound />}
                        title="Change Password"
                        desc="Update your password"
                        href="/auth/forgot-password"
                    />

                    <SecurityCard
                        icon={<ShieldCheck />}
                        title="2FA Authentication"
                        desc="Coming soon"
                        disabled
                    />

                </CardSection>

            </main>
        </div>
    )
}

export default UserProfile