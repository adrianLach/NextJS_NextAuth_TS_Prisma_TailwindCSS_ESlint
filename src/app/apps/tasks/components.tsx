'use client'

import { CheckIcon, CloseIcon } from '@/components/Icons'
import { useFormState, useFormStatus } from 'react-dom'
import { addTask, deleteTask } from './actions'
import React, { useState } from 'react'


export type DropDownItems = {
    key: string,
    node: React.ReactNode
}

const DropDownMenu = ({items}: {items: DropDownItems[]}) => {

    const [open, setOpen] = useState(false)

    const Item = ({item}: {item: DropDownItems}) => {

        const [selected, setSelected] = useState(false)

        return (
            <li 
                onClick={() => setSelected(!selected)}
                className='flex flex-row px-4 py-2 hover:bg-slate-600 justify-between items-center gap-2'>
                {item.node}
                {selected ?
                    <CheckIcon className='text-green-500'></CheckIcon>
                    :
                    <div className='w-[24px] h-[24px]'></div>
                }
            </li>
        )
    }

    return (
        <>
            <div className='select-none'>
                <button id="dropdownDefaultButton" onClick={() => setOpen(!open)} 
                    className="mb-2 text-white bg-slate-500 hover:bg-slate-600 focus:ring-1 focus:outline-none focus:ring-white rounded-md text-sm px-4 py-2 text-center inline-flex items-center" type="button">Status<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                {open &&
                <>
                    <div className='z-10 w-screen h-screen absolute top-0 left-0' onClick={() => setOpen(false)}></div>
                    <div id="dropdown" className="absolute z-20 rounded-md bg-slate-800 text-white shadow-xl shadow-slate-800">
                        <ul className="py-2 text-sm">
                            {items.map(e => {
                                return (
                                    <Item key={e.key} item={e}></Item>
                                )
                            })}
                        </ul>
                    </div>
                </>
                }
            </div>
        </>
    )
}

const MenuButton = ({title, children}: {title: string, children: React.ReactNode}) => {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)}>{title}</button>
            {open && children}
        </div>
    )
}

const Menu = ({items}: {items: string[]}) => {
    return (
        <div className='rounded-md bg-slate-500 p-2 absolute flex flex-col'>
            {items.map((e, i) => {

                return (
                    <div key={i} className='flex flex-row gap-2'>
                        <input type='checkbox'></input>
                        {e}
                    </div>
                )
            })}
        </div>
    )
}

const TableDeleteButton = ({id, rev}: {id: string, rev: string}) => {

    const { pending } = useFormStatus()

    return (
        <form action={deleteTask}>
            <input name='taskId' hidden defaultValue={id}></input>
            <input name='revPath' hidden defaultValue={rev}></input>
            <button disabled={pending} type='submit' className='bg-slate-600 rounded-md p-2 font-bold text-lg hover:bg-slate-500 hover:shadow-lg transition-all active:bg-slate-400'>Delete</button>
        </form>
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

export { TableDeleteButton, AddTaskForm, MenuButton, Menu, DropDownMenu }