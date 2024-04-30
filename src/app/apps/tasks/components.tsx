'use client'

import { BinIcon, CloseIcon } from '@/components/Icons'
import { useFormState, useFormStatus } from 'react-dom'
import { addTask } from './actions'

const TableDeleteButton = () => {

    const { pending } = useFormStatus()

    return (
        <button type= 'submit' disabled={pending}>
            <BinIcon size={ 24 } className={pending ? 'bg-orange-400 text-white rounded-md' : 'dark:text-red-500 hover:bg-red-500 hover:text-white hover:rounded-md transition-all'}></BinIcon>
        </button>
    )
}

const AddTaskForm = () => {

    const initialState = {
        error: '',
        message: ''
    }

    const [state, formAction] = useFormState(addTask, initialState)
    const {pending} = useFormStatus()

    return (
        <form action={formAction}>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-center'>
                    <p className='text-lg text-center grow'>Add a new Task</p>
                    <button>
                        <CloseIcon size={24} className='dark:text-white hover:bg-slate-500 hover:text-white hover:rounded-md transition-all'></CloseIcon>
                    </button>
                </div>
                <div className='h-[2px] border border-slate-500'></div>
                <input name='task_name' type='text' placeholder='Name' className='bg-slate-900 w-96 p-2 text-white rounded-md'></input>
                <p aria-live="polite" className="sr-only">
                    {state?.errors}
                </p>
                <textarea name='task_description' placeholder='Description' className='bg-slate-900 p-2 text-white rounded-md'>
                </textarea>
                <input name='task_due_to' type='date' placeholder='Due to' className='bg-slate-900 p-2 dark:text-white dark:[color-scheme:dark] text-white rounded-md'></input>
                <div className='h-[2px] border border-slate-500'></div>
                <button disabled={pending} type='submit' className='bg-slate-600 rounded-md p-2 font-bold text-lg hover:bg-slate-500 hover:shadow-lg transition-all active:bg-slate-400'>Add</button>

            </div>
        </form>
    )
}

export { TableDeleteButton, AddTaskForm }