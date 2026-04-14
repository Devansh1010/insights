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
 
const ProfilePage = () => {

  const { data, isPending, isError } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getMe,
  })

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load profile</div>
  }

  console.log(data)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">

      {/* Header */}
      <div className="h-52 w-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border-b border-zinc-200 dark:border-zinc-800" />

      <main className="max-w-3xl mx-auto px-6 -mt-20 pb-32">

        {/* Profile Section */}
        <section className="flex flex-col items-center text-center space-y-6 mb-16">

          <div className="relative group">
            <div className="h-36 w-36 rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 border-[6px] border-white dark:border-zinc-950 shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">

              {data?.avatar ? (
                <Image
                  src={data.avatar}
                  alt={data.username}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                  {data?.username?.charAt(0)}
                </div>
              )}
            </div>

            {/* Hover Edit Icon */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm flex items-center justify-center transition">
              <Camera className="text-white w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">

              <h1 className="text-3xl font-bold tracking-tight">
                {data?.username}
              </h1>

              {data?.isVerified ? (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/10 text-yellow-500 border-none text-xs">
                  <ShieldAlert className="w-3 h-3 mr-1" /> Not Verified
                </Badge>
              )}

            </div>

            <p className="text-zinc-500">{data?.email}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <EditProfile />

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

        </section>

        {/* Info Section */}
        <div className="space-y-12">

          <SectionHeader
            title="Account Details"
            description="Your identity and account info"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <ProfileItem icon={<UserIcon />} label="Username" value={data?.username} />
            <ProfileItem icon={<Mail />} label="Email" value={data?.email} />
            <ProfileItem icon={<Calendar />} label="Joined" value="March 2026" />
            <ProfileItem icon={<Settings2 />} label="Role" value="Developer" />

          </div>

          <Separator />

          {/* Security */}
          <SectionHeader
            title="Security"
            description="Manage account protection"
          />

          <div className="space-y-4">

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

          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null | undefined }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
        {icon}
        {label}
      </div>
      <p className="text-lg font-semibold">{value || "—"}</p>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-zinc-400">
        {title}
      </h2>
      <p className="text-sm text-zinc-500">{description}</p>
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