'use server'

import { getData, SSProps, Tasks } from './actions'
import { TaskCompleteButton, TaskDateRow, TaskDeleteButton, TaskEditButton, Toolbar } from './components'
import Badge, { BadgeStatus } from '@/components/Badge'

export default async function TasksView() {

    const data = await getData()

    const props: SSProps = JSON.parse(data, (key, value) => {
        if (key === 'dueTo')
            return value === null ? undefined : new Date(value)
        return value
    })

    if (props.error)
        return (
            <div className='flex flex-row items-center justify-center'>
                <p className='text-lg'>An Error occured</p>
                <p>{JSON.stringify(props.error)}</p>
            </div>
        )

    const getStatusFormText = (test: string) => {
        switch (test) {
            case 'minor':
                return 'none' as BadgeStatus
            case 'major':
                return 'warning' as BadgeStatus
            case 'critical':
                return 'error' as BadgeStatus
            default:
                return 'success' as BadgeStatus
        }
    }

    const TableRow = ({ task }: { task: Tasks }) => {
        return (
            <tr className="odd:bg-slate-900 even:bg-slate-800 border-b border-slate-700">
                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap uppercase">
                    <Badge text={task.status} status={getStatusFormText(task.status)}></Badge>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                    {task.name}
                </td>
                <td className="px-6 py-2">
                    {task.description}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                    <TaskDateRow id={task.id} date={task.dueTo}></TaskDateRow>
                </td>
                <td className="px-6 py-2">
                    <div className='flex flex-row gap-2'>
                        <TaskEditButton id={task.id}></TaskEditButton>
                        {task.status === 'Complete'
                            ?
                            <TaskDeleteButton id={task.id}></TaskDeleteButton>
                            :
                            <TaskCompleteButton id={task.id}></TaskCompleteButton>
                        }
                    </div>
                </td>
            </tr>
        )
    }
    const Table = ({ tasks }: { tasks: Tasks[] }) => {
        return (
            <div className="relative overflow-x-auto shadow-lg shadow-slate-800 rounded-lg">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs uppercase bg-slate-600 text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">Severity</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(e => <TableRow key={e.id} task={e}></TableRow>)}
                    </tbody>
                </table>
            </div>

        )
    }

    return (
        <main className='text-white w-full p-4 flex flex-col gap-4'>
            <Toolbar></Toolbar>
            <div className='w-full flex flex-row gap-4'>
                <div className='grow'>
                    {props.data && <Table tasks={props.data}></Table>}
                </div>
            </div>
        </main>
    )
}
