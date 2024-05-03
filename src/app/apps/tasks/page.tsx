'use server'

import Badge from '@/components/Badge'

import { getData, SSProps } from './actions'
import { AddTaskForm, DropDownMenu, TableDeleteButton } from './components'
import { Table } from '@/components/Table'

export default async function Tasks() {

    const data = await getData()

    const props: SSProps = JSON.parse(data, (key, value) => {
        if(key === 'dueTo')
            return value === null ? undefined : new Date(value)
        return value
    })

    const tasks = props.data?.map(e => {
        return {
            id: e.id,
            status: <Badge status={'none'} text={e.status}></Badge>,
            name: e.name,
            description: e.description,
            dueTo: e.dueTo?.toLocaleDateString('de-DE')
        }
    })

    if(props.error) 
        return (
            <div className='flex flex-row items-center justify-center'>
                <p className='text-lg'>An Error occured</p>
                <p>{JSON.stringify(props.error)}</p>
            </div>
        )

    return (
        <main className='text-white w-full p-4'>
            <div id='toolbar' className='flex flex-row gap-2'>
                <DropDownMenu
                    items={[
                        {
                            key: 'todo',
                            node: <Badge text='TODO' status='none'></Badge>
                        },
                        {
                            key: 'in_progress',
                            node: <Badge text='IN PROGRESS' status='warning'></Badge>
                        },
                        {
                            key: 'done',
                            node: <Badge text='DONE' status='success'></Badge>
                        },
                        {
                            key: 'failed',
                            node: <Badge text='FAILED' status='error'></Badge>
                        }
                    ]}
                ></DropDownMenu>
                <TableDeleteButton
                    id=''
                    rev=''
                ></TableDeleteButton>
            </div>
            <div className='w-full flex flex-row gap-4'>
                <div className='grow'>
                    <Table
                        columns={[
                            {
                                id: 'status',
                                text: 'Status'
                            },
                            {
                                id: 'name',
                                text: 'Name'
                            },
                            {
                                id: 'description',
                                text: 'Description'
                            },
                            {
                                id: 'dueTo',
                                text: 'Due To',
                                numeric: true
                            },
                        ]}
                        data={tasks}
                    >
                    </Table>
                </div>
                <div className='w-[2px] border border-slate-500'></div>
                <div className='text-white'>
                    <AddTaskForm></AddTaskForm>
                </div>
            </div>
        </main>
    )
}
