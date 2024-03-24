'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignInOutButton() {

    const { data } = useSession()

    if (!data)
        return (
            <button onClick={() => signIn()} className='flex gap-2 rounded-md px-2 py-1 border-2 border-slate-400 bg-slate-200 text-slate-600'>
                Sign In
            </button>
        )

    return (
        <>
            <button onClick={() => signOut()} className='flex gap-2 rounded-md px-2 py-1 border-2 border-slate-400 bg-slate-200 text-slate-600'>
                <Image className='rounded-[50%]' src={data.user?.image || ''} width={24} height={24} alt='User Profile Picture' />
                Sign Out
            </button>
        </>
    )
}