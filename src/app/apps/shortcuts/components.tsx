'use client'
import { AddIcon, CheckIcon, CloseIcon, EditIcon } from '@/components/Icons'
import Link from 'next/link'
import { useState } from 'react'

const folder = {
    name: 'Socials',
    items: [
        {
            name: 'YouTube',
            href: 'https://youtube.com',
            image: 'https://youtube.com/favicon.ico'
        },
        {
            name: 'Twitch',
            href: 'https://twitch.tv',
            image: 'https://twitch.tv/favicon.ico'
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com',
            image: 'https://twitter.com/favicon.ico'
        },
        {
            name: 'Reddit',
            href: 'https://reddit.com',
            image: 'https://reddit.com/favicon.ico'
        },
    ]
}

const Folder = () => {

    const size = 16

    const [editPanelOpen, setEditPanelOpen] = useState(false)
    const [editText, setEditText] = useState(false)

    const ModalPanel = ({ children, onDispose }: { children?: React.ReactNode, onDispose?: () => void }) => {
        return (
            <>
                <div className='z-10 w-screen h-screen absolute top-0 left-0 bg-slate-300/25' onClick={onDispose}></div>
                <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
                    <div className="absolute z-20 mt-2 rounded-md bg-slate-800 text-white shadow-md shadow-black">
                        {children}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={'rounded-lg bg-slate-600 p-4 grow'}>
            {editText
                ?
                <div className='flex w-full gap-4 items-center'>
                    <input className='grow bg-slate-700 text-white text-xl outline outline-white rounded-md' defaultValue={folder.name}></input>
                    <button onClick={() => setEditText(false)}>
                        <CheckIcon></CheckIcon>
                    </button>
                    <button onClick={() => setEditText(false)}>
                        <CloseIcon></CloseIcon>
                    </button>
                </div>
                :
                <div className='flex w-full gap-4 items-center'>
                    <p className='text-xl grow'>{folder.name}</p>
                    <button onClick={() => setEditText(true)}>
                        <EditIcon></EditIcon>
                    </button>
                </div>
            }
            <div className={'flex flex-row flex-wrap gap-4 pt-4 transition-all justify-start'}>
                {[...folder.items].map((e, i) => {
                    return (
                        <Link key={i} href={e.href} target='_blank'>
                            <div className={`max-w-${size} min-w-${size} min-h-${size} max-h-${size} overflow-clip bg-slate-800 p-2 text-center rounded-xl hover:shadow-lg hover:shadow-black transition-all flex flex-col items-center justify-center`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={e.image} alt={e.name} width={32} height={32}></img>
                            </div>
                        </Link>
                    )
                })}
                {editText &&
                    <div>
                        <div onClick={() => setEditPanelOpen(true)} className={`max-w-${size} min-w-${size} min-h-${size} max-h-${size} overflow-clip bg-slate-800 p-2 text-center rounded-xl hover:shadow-lg hover:shadow-black transition-all flex flex-col items-center justify-center`}>
                            <AddIcon size={32}></AddIcon>
                        </div>
                        {editPanelOpen &&
                            <ModalPanel
                                onDispose={() => setEditPanelOpen(false)}
                            >
                                <form className='flex flex-col gap-2 p-4 w-96'>
                                    <p className='text-xl'>Add a new Shortcut</p>
                                    <div className='h-[2px] border border-slate-500'></div>
                                    <label htmlFor='name'>Name</label>
                                    <input required className='bg-slate-900 p-2 text-white rounded-md' id='name'></input>
                                    <label htmlFor='url'>URL</label>
                                    <input required className='bg-slate-900 p-2 text-white rounded-md' id='url'></input>
                                    <label htmlFor='icon'>Icon</label>
                                    <input className='bg-slate-900 p-2 text-white rounded-md' id='icon'></input>
                                    <div className='h-[2px] border border-slate-500'></div>
                                    <button type='submit' className='bg-slate-600 rounded-md p-2 font-bold text-lg hover:bg-slate-500 hover:shadow-lg transition-all active:bg-slate-400'>Add</button>
                                </form>
                            </ModalPanel>
                        }
                    </div>
                }
            </div>
        </div>
    )

}

export { Folder }