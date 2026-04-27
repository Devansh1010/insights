"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";


export type ImageKitData = {
    url: string | undefined,
    name: string | undefined,
    id: string | undefined
}

export const UploadImage = ({ onUploadSuccess }: { onUploadSuccess: (data: ImageKitData) => void }) => {
    // State to keep track of the current upload progress (percentage)
    const [progress, setProgress] = useState(0);

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     *
     * This function calls the authentication API endpoint to receive upload parameters like signature,
     * expire time, token, and publicKey.
     *
     * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
     * @throws {Error} Throws an error if the authentication request fails.
     */
    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await axios.get("/api/upload-auth");
            if (!response.data) {
                // If the server response is not successful, extract the error text for debugging.
                throw new Error(`Request failed with status ${response.status}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.data;
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
    const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });

            if (uploadResponse.$ResponseMetadata.statusCode === 200) {
                toast.success("Image uploaded Successfully")
                setProgress(0)

                const formatedData = {
                    url: uploadResponse.url,
                    name: uploadResponse.name,
                    id: uploadResponse.fileId
                }

                onUploadSuccess(formatedData);
            }

        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };

    return (
        <>
            {/* The outer div now uses inset-0 if you want it to perfectly overlap, 
    or simply w-full h-full to fill the parent's circle/box.
  */}
            <div className="w-full h-full flex items-center justify-center">
                {/* Hidden Input remains the same */}
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleUpload}
                    accept="image/*"
                />

                {/* Upload Trigger Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative flex flex-col items-center justify-center w-full h-full 
                 rounded-full transition-all duration-300 cursor-pointer 
                 hover:bg-primary/10"
                >
                    {/* Icon/Text Container */}
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        {progress > 0 && progress < 100 ? (
                            // Circular Progress View
                            <div className="relative flex items-center justify-center">
                                <svg className="w-10 h-10 transform -rotate-90">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="transparent"
                                        className="text-muted"
                                    />
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="18"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="transparent"
                                        strokeDasharray={113}
                                        strokeDashoffset={113 - (113 * progress) / 100}
                                        className="text-primary transition-all duration-300"
                                    />
                                </svg>
                                <span className="absolute text-[10px] font-bold">{progress}%</span>
                            </div>
                        ) : (
                            // Default Upload State
                            <>
                                <Upload className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-[10px] font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                                    Upload
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadImage;