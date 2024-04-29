'use server'

import Badge from '@/components/Badge'
import { CloseIcon } from '@/components/Icons'

import { addDummyTask, deleteTask, getData, SSProps } from './actions'
import { TabelAddDummyButton, TableDeleteButton } from './components'

export default async function Tasks() {

    const data = await getData()

    const props: SSProps = JSON.parse(data)

    const getStatusCode = (status: string) => {
        switch (status) {
            case 'done':
                return 'success'
            case 'in progress':
                return 'warning'
            case 'overdue':
                return 'error'
            default:
                return 'none'
        }
    }

    if(props.error) 
        return (
            <div className='flex flex-row items-center justify-center'>
                <p className='text-lg'>An Error occured</p>
                <p>{JSON.stringify(props.error)}</p>
            </div>
        )

    const Content = () => {
        return (
            <>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='border-b-2 border-b-white'>
                            <th className='text-start'>Status</th>
                            <th className='text-start'>Task</th>
                            <th className='text-start'>Description</th>
                            <th className='text-end'>Due to</th>
                            <th className='text-end'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data && props.data.map((e, i) => <tr key={i} className='border-b border-b-white'>
                            <td><Badge text={e.status} status={getStatusCode(e.status)}></Badge></td>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td className='text-end'>{e.dueTo ? e.dueTo.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                            <td className='text-end'>
                                <form action={deleteTask}>
                                    <input name='id' defaultValue={e.id} hidden></input>
                                    <input name='route' defaultValue={'apps/tasks'} hidden></input>
                                    <TableDeleteButton></TableDeleteButton>
                                </form>
                            </td>
                        </tr>)}
                        <tr>
                            <td colSpan={5} className='text-center border-b border-b-white'>
                                <form action={addDummyTask}>
                                    <input name='route' defaultValue={'apps/tasks'} hidden></input>
                                    <TabelAddDummyButton></TabelAddDummyButton>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <main className='text-white w-full p-4'>
            <div className='w-full flex flex-row gap-4'>
                <div className='grow'>
                    <Content></Content>
                </div>
                <div className='w-[2px] border border-slate-500'></div>
                <div className='text-white'>
                    <form action={async() => 
                    {
                        'use server'
                    }}>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-center'>
                                <p className='text-lg text-center grow'>Add a new Task</p>
                                <button>
                                    <CloseIcon size={24} className='dark:text-white hover:bg-slate-500 hover:text-white hover:rounded-md transition-all'></CloseIcon>
                                </button>
                            </div>
                            <div className='h-[2px] border border-slate-500'></div>
                            <input type='text' placeholder='Name' className='bg-slate-900 w-96 p-2 text-white rounded-md'></input>
                            <textarea placeholder='Description' className='bg-slate-900 p-2 text-white rounded-md'>
                            </textarea>
                            <input type='date' placeholder='Due to' className='bg-slate-900 p-2 dark:text-white dark:[color-scheme:dark] text-white rounded-md'></input>
                            <div className='h-[2px] border border-slate-500'></div>
                            <button type='submit' className='bg-slate-600 rounded-md p-2 font-bold text-lg hover:bg-slate-500 hover:shadow-lg transition-all active:bg-slate-400'>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
