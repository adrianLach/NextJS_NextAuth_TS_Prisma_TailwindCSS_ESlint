'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function UserPanel() {

    const { data } = useSession()

    if (data)
        return (
            <div className='inline-flex gap-2 h-fit'>
                <Image className='rounded-[50%]' src={data.user?.image || ''} width={32} height={32} alt='User Profile Picture' />
                <div className='max-h-[32px] flex flex-col justify-center h-full'>
                    <p className='text-slate-200 text-xl leading-3'>
                        {data.user?.name}
                    </p>
                    <p className='text-slate-200 text-sm'>
                        {data.user?.email}
                    </p>
                </div>
            </div>
        )

    return null
}