"use client"

import { getMe } from '@/utils/me'
import {
  ShieldCheck,
  ShieldAlert,
  Mail,
  Calendar,
  Camera,
  LogOut,
  KeyRound,
  User as UserIcon,
  ChevronRight,
  Settings2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import EditProfile from '@/components/features/user/EditProfile'
import { useQuery } from '@tanstack/react-query'
import { signOut } from "next-auth/react"

const ProfilePage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">

      {/* TOP BANNER */}
      <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20" />

      <main className="max-w-4xl mx-auto px-6 -mt-24 pb-24 space-y-10">

        {/* PROFILE CARD */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center text-center space-y-6">

          {/* Avatar */}
          <div className="relative group">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-lg">

              {data?.avatar ? (
                <Image
                  src={data.avatar}
                  alt={data.username}
                  fill
                  className="object-cover"
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

export default ProfilePage

// ---------- SMALL COMPONENTS ----------

function CenterScreen({ text, error }: { text: string; error?: boolean }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${error ? 'text-red-500' : ''}`}>
      {text}
    </div>
  )
}

function CardSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">

      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-400">
          {title}
        </h2>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  )
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">

      <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest mb-1">
        {icon}
        {label}
      </div>

      <p className="text-base font-semibold">{value || "—"}</p>
    </div>
  )
}

function SecurityCard({ icon, title, desc, href, disabled }: { icon: React.ReactNode; title: string; desc: string; href?: string; disabled?: boolean }) {

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