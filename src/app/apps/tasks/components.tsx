'use client'

import { BinIcon } from '@/components/Icons'
import { useFormStatus } from 'react-dom'

const TableDeleteButton = () => {

    const { pending } = useFormStatus()

    return (
        <button type= 'submit' disabled={pending}>
            <BinIcon size={ 24 } className={pending ? 'bg-orange-400 text-white rounded-md' : 'dark:text-red-500 hover:bg-red-500 hover:text-white hover:rounded-md transition-all'}></BinIcon>
        </button>
    )
}

const TabelAddDummyButton = () => {

    const { pending } = useFormStatus()

    return (
        <button type='submit' disabled={pending}>{pending ? 'Adding...' : 'Add Dummy Task'}</button>
    )
}

export { TableDeleteButton, TabelAddDummyButton }