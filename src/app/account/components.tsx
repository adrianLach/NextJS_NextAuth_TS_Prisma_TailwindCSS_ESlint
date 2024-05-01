'use client'
import { signOut } from 'next-auth/react'


const SignOutButton = () => {
    return <button className='bg-slate-600 hover:bg-slate-700 active:bg-slate-800 px-4 py-2 rounded-xl text-xl transition-all' onClick={() => {
        signOut({callbackUrl: '/', redirect: true})
    }}>Sign Out</button>
}

export { SignOutButton }