import { SignedOut, SignInButton } from '@clerk/clerk-react'
import React from 'react'
import placeholderImage from '../assets/login.png'
function Login() {
    return (
        <SignedOut>
            <section className="max-w-7xl mx-auto">
                <div>
                    <h1 className="font-extrabold text-[#222328] text-[32px]">
                        Welcome to Hugging Face AI Image Generation
                    </h1>
                    <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
                        Please sign in to browse and generate imaginative and visually stunning images using the Hugging Face AI Image Generation tool.
                    </p>
                </div>

                <div className="flex justify-center mt-10">
                    <img src={placeholderImage} alt="Please sign in" className="max-w-full h-auto w-64" />
                </div>

                <div className="flex justify-center mt-4">
                    <p className="text-[#6469ff] font-medium text-xl">
                        <SignedOut>
                            {/* Show Sign In button if user is not signed in */}
                            <SignInButton mode="modal">
                                <button className='font-inter font-medium bg-[#6469ff] text-white px-3 sm:px-4 py-2 rounded-md'>
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </p>
                </div>
            </section>
        </SignedOut>
    )
}

export default Login