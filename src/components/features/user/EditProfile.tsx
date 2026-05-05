import UploadImage, { ImageKitData } from '@/components/Imagekit/ImageUpload';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { updateUserSchema } from '@/lib/schemas/auth/signUpSchema';
import { updateProfile } from '@/services/user.service';
import { getMe } from '@/utils/me';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2, Pencil, PlusCircle, Save } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts';
import { z } from 'zod';

const EditProfile = () => {
    const [username, setUsername] = useState<string>('')
    const [usernameMessage, setUsernameMessage] = useState<string>('')
    const [isCheckUsername, setIsCheckUsername] = useState<boolean>(false)
    const [emailDisabled, setEmailDisabled] = useState<boolean>(true)
    const debounced = useDebounceCallback(setUsername, 300)

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getMe
    })

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: "",
            username: "",
            profileImage: null,

        },
    });

    useEffect(
        () => {
            if (data) {
                console.log(data)
                form.reset({
                    username: data.username || '',
                    profileImage: data.avatar || '',
                    email: data.email || ''
                })
            }
        }
        , [data, form])

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckUsername(true)
                try {
                    const responce = await axios.get(`/api/auth/check-username-unique?username=${username}`);
                    console.log(responce)
                    setUsernameMessage(responce.data.message)
                } catch (error: unknown) {
                    // we are not using any in ts for error handling so we need to cast error to any to access response data
                    const axiosError = error ? error as { response?: { data?: { message?: string } } } : null;
                    setUsernameMessage(
                        axiosError?.response?.data?.message || "Error Checking username"
                    )
                } finally {
                    setIsCheckUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username])

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            toast.success("Profile updated Successfully");
            form.reset();
        },
        onError: () => toast.error("Failed to Update Profile"),
    });

    const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
        mutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all py-6"
                >
                    <PlusCircle className="h-4 w-4 text-primary" />
                    <span className="font-bold tracking-tight">Update User Profile</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-112.5 p-0 overflow-hidden border-none shadow-2xl bg-background/95 backdrop-blur-md">
                {/* Visual Progress/Accent Bar */}
                <div className="h-1.5 w-full bg-muted overflow-hidden">
                    <div
                        className={`h-full bg-linear-to-r from-primary via-purple-500 to-blue-500 transition-all duration-500 ${mutation.isPending ? "w-full animate-pulse" : "w-0"
                            }`}
                    />
                </div>

                <div className="p-8">
                    <DialogHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Save className="w-5 h-5 text-primary" />
                            </div>
                            <DialogTitle className="text-2xl font-black tracking-tight">
                                Account Settings
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-muted-foreground leading-relaxed">
                            Fine-tune your professional presence. Changes will reflect across all
                            technical collections.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Avatar Section - Re-designed */}
                        <Controller
                            name="profileImage"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-3">
                                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                                        Avatar
                                    </label>
                                    <div className="flex items-center gap-6 p-4 border-2 border-dashed border-border/60 rounded-2xl bg-secondary/10">
                                        <div className="relative group w-20 h-20 shrink-0">
                                            {!field.value ? (
                                                <div className="w-full h-full rounded-full bg-secondary/40 flex items-center justify-center overflow-hidden border-2 border-border/50">
                                                    <UploadImage
                                                        onUploadSuccess={(data: ImageKitData) => {
                                                            field.onChange({ 
                                                                url: data.url });
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
                                                    <Image
                                                        src={field.value?.url || "/placeholder-aspect.png"}
                                                        alt="profile"
                                                        fill
                                                        className="object-cover transition duration-500 group-hover:scale-110"
                                                    />
                                                    {/* Interactive Circular Overlay */}
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                field.onChange(null);
                                                            }}
                                                            className="text-[10px] font-bold text-white bg-primary px-2 py-1 rounded-full hover:bg-primary/80 transition-transform active:scale-90"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-semibold">Profile Photo</p>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG or GIF. Max 2MB.
                                            </p>
                                            {fieldState.error && (
                                                <p className="text-[11px] text-destructive font-bold mt-1 animate-pulse">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        {/* Username Field */}
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                                        Username
                                    </label>
                                    <Input
                                        {...field}
                                        disabled={mutation.isPending}
                                        className="bg-secondary/30 border-border/50 focus:ring-primary/20 h-12 rounded-xl"
                                        placeholder="e.g. janesmith_dev"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            debounced(e.target.value)
                                        }}
                                    />
                                    {fieldState.error && (
                                        <p className="text-xs text-destructive font-medium">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                    {isCheckUsername && <Loader2 className="animate-spin" />}
                                    <p className={`text-sm ${usernameMessage === "Username Available" ? 'text-green-600' : 'text-red-600'}`}>
                                        {usernameMessage}
                                    </p>
                                </div>
                            )}
                        />

                        {/* Email Field */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                                        Email Address
                                    </label>

                                    {/* 1. Added 'group' and 'relative' to the container */}
                                    <div className="relative group">
                                        <Input
                                            {...field}
                                            disabled={emailDisabled || mutation.isPending}
                                            className="bg-secondary/30 border-border/50 focus:ring-primary/20 h-12 rounded-xl pr-12 transition-all duration-300"
                                            placeholder="name@company.com"
                                        />

                                        {/* 2. The Pencil Button */}
                                        <Button
                                            type="button"
                                            className="absolute right-3 top-1 p-2 rounded-lg
                                hover:text-foreground hover:bg-background/50
                               opacity-0 group-hover:opacity-100 cursor-pointer"
                                            onClick={() => setEmailDisabled((prev) => !prev)}
                                        >


                                            <Pencil size={16} strokeWidth={2} />
                                        </Button>
                                    </div>

                                    {fieldState.error && (
                                        <p className="text-xs text-destructive font-medium">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Actions */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                                className="w-full rounded-xl h-14 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] text-base"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Synchronizing...
                                    </>
                                ) : (
                                    "Save Profile Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile