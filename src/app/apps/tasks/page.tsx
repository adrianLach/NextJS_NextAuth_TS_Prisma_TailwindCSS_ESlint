'use server'

import Badge from '@/components/Badge'

import { deleteTask, getData, SSProps } from './actions'
import { AddTaskForm, TableDeleteButton } from './components'

export default async function Tasks() {

    const data = await getData()

    const props: SSProps = JSON.parse(data, (key, value) => {
        if(key === 'dueTo')
            return value === null ? undefined : new Date(value)
        return value
    })

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
                <table className='table-auto w-full text-sm'>
                    <thead>
                        <tr className='border-b-2 border-b-white'>
                            <th className='px-2 text-start'>Status</th>
                            <th className='px-2 text-start'>Task</th>
                            <th className='px-2 text-start'>Description</th>
                            <th className='px-2 text-end'>Due to</th>
                            <th className='px-2 text-end'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data && props.data.map((e, i) => {
                            const deleteTaskById = deleteTask.bind(null, e.id).bind(null, 'apps/tasks')
                            return (
                                <tr key={i} className='border-b border-b-white'>
                                    <td className='px-2'><Badge text={e.status} status={getStatusCode(e.status)}></Badge></td>
                                    <td className='px-2'>{e.name}</td>
                                    <td className='px-2'>{e.description}</td>
                                    <td className='px-2 text-end whitespace-nowrap'>{e.dueTo ? e.dueTo.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                                    <td className='px-2 text-end'>
                                        <form action={deleteTaskById}>
                                            <input name='id' defaultValue={e.id} hidden></input>
                                            <input name='route' defaultValue={'apps/tasks'} hidden></input>
                                            <TableDeleteButton></TableDeleteButton>
                                        </form>
                                    </td>
                                </tr>
                            )})}
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
                    <AddTaskForm></AddTaskForm>
                </div>
            </div>
        </main>
    )
}
