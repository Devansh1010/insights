'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { Dispatch, SetStateAction } from 'react'

interface UploadButtonProps {
  setImageUrl: Dispatch<SetStateAction<string | null>>
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string
    public_id: string
  }
}

export default function UploadButton({ setImageUrl }: UploadButtonProps) {
  return (
    <CldUploadWidget
      uploadPreset="blog_upload"
      onSuccess={(result) => {
        const data = result as CloudinaryUploadResult
        const url = data.info.secure_url

        setImageUrl(url)
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload Cover Image
        </button>
      )}
    </CldUploadWidget>
  )
}