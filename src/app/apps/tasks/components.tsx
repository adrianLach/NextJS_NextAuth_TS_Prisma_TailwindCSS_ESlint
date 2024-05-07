'use client'

import { AddIcon, CalendarIcon, CheckIcon, TableIcon } from '@/components/Icons'
import { useFormState, useFormStatus } from 'react-dom'
import { Tasks, addTask, completeTask, deleteTask, updateDate } from './actions'
import React, { useEffect, useState } from 'react'
import Badge, { BadgeStatus } from '@/components/Badge'


export type DropDownItems = {
    key: string,
    node: React.ReactNode
}

const DropDownMenu = ({ items }: { items: DropDownItems[] }) => {

    const [open, setOpen] = useState(false)

    const Item = ({ item }: { item: DropDownItems }) => {

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
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
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

const TableDeleteButton = ({ id, rev }: { id: string, rev: string }) => {

    const { pending } = useFormStatus()

    return (
        <form action={deleteTask}>
            <input name='taskId' hidden defaultValue={id}></input>
            <input name='revPath' hidden defaultValue={rev}></input>
            <button disabled={pending} type='submit' className='bg-slate-600 rounded-md p-2 font-bold text-lg hover:bg-slate-500 hover:shadow-lg transition-all active:bg-slate-400'>Delete</button>
        </form>
    )
}

export type DialogProps = {
    title: string,
    open: boolean,
    onDismiss: () => void,
    children: React.ReactNode

}

const Dialog = (props: DialogProps) => {

    if (props.open)
        return (
            <>
                <div
                    className='fixed z-20 top-0 left-0 w-screen h-screen flex justify-center items-center text-white'>
                    <div
                        onClick={props.onDismiss}
                        className='fixed z-10 top-0 left-0 backdrop-blur-sm w-screen h-screen transition-all'>
                    </div>
                    <div className='z-20 bg-slate-700 rounded-lg shadow-2xl shadow-slate-900 ring-1 ring-slate-600 max-h-[80%]'>
                        <div className='bg-slate-800 p-4 rounded-t-lg flex justify-center text-xl'>
                            {props.title}
                        </div>
                        <div className='p-4'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </>
        )

    return null
}

const TaskViewWithToolbar = ({ tasks }: { tasks: Tasks[] }) => {

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
                    {task.name} {task.status}
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

    const CalendarView = (props: { tasks: Tasks[] }) => {
        const DayView = (props: { tasks: Tasks[], date: Date }) => {
            return (
                <div className='group min-h-24 bg-slate-800 flex flex-col gap-1 p-1 rounded-lg select-none'>
                    <div className='text-center'>
                        {new Date(props.date.toISOString().substring(0, 10)).toLocaleDateString('en-US', { day: '2-digit', weekday: 'long', month: 'long' })}
                    </div>
                    <div
                        className='group-hover:bg-slate-700 group-hover:text-white rounded-md flex flex-row p-1 justify-center transition-all text-slate-800'
                    >
                        <p><AddIcon></AddIcon></p>
                    </div>
                    {props.tasks
                        .filter(e => e.dueTo ? e.dueTo.toISOString().substring(0, 10) === props.date.toISOString().substring(0, 10) : false)
                        .map((e) => {
                            return (
                                <div
                                    key={e.id}
                                    className='bg-slate-700 text-sm flex flex-row gap-1 whitespace-nowrap overflow-x-clip p-1 rounded-md justify-between'
                                >
                                    <p className='overflow-clip'>{e.name}</p>
                                    <p><Badge text={e.status.substring(0, 1)} status={getStatusFormText(e.status)}></Badge></p>
                                </div>
                            )
                        })}
                </div>
            )
        }

        const getDaysOfMonth = (year: number, monthIndex: number) => new Date(year, monthIndex + 1, 0).getDate()
        const getFirstWeekdayOfMonth = (year: number, monthIndex: number) => new Date(year, monthIndex, 1).getDay()

        return (
            <div className='bg-slate-900 shadow-lg shadow-slate-800 rounded-lg'>
                <div className="text-xs uppercase bg-slate-600 text-slate-300 h-16 rounded-t-lg">

                </div>
                <div className='grid grid-cols-7 gap-2 p-4 relative overflow-x-auto'>
                    {[...new Array(getFirstWeekdayOfMonth(2024, 4))].map((e, i) => <div key={i}></div>)}
                    {[...new Array(getDaysOfMonth(2024, 4))].map((e, i) => {
                        return (
                            <DayView key={i} tasks={props.tasks} date={new Date(2024, 4, i + 2)}></DayView>
                        )
                    })}
                </div>
            </div>
        )
    }

    const [date, setDate] = useState(new Date())
    const [ignoreCompleted, setIgnoreCompleted] = useState(false)
    const [view, setView] = useState<'table' | 'calendar'>('table')

    return (
        <div className='text-white w-full p-4 flex flex-col gap-4'>
            <Toolbar
                filter={
                    {
                        date: {
                            value: date,
                            onChange: (e) => setDate(e)
                        },
                        ignoreCompleted: {
                            value: ignoreCompleted,
                            onChange: (e) => setIgnoreCompleted(e)
                        },
                        view: {
                            value: view,
                            onChange: (e) => setView(e)
                        }
                    }}
            ></Toolbar >
            <div className='w-full flex flex-col gap-4'>
                <div className='grow'>
                    {view === 'table' &&
                        <Table tasks={
                            tasks
                                .filter(e => ignoreCompleted ? e.status !== 'Complete' : true)
                                .filter(e => e.dueTo ? e.dueTo.toISOString().substring(0, 10) === date.toISOString().substring(0, 10) : true)
                        }></Table>
                    }
                    {view === 'calendar' &&
                        <CalendarView tasks={tasks}></CalendarView>
                    }
                </div>
            </div>
        </div>
    )
}

type ToolbarProps = {
    filter: {
        date: {
            value: Date,
            onChange: (d: Date) => void
        },
        ignoreCompleted: {
            value: boolean,
            onChange: (d: boolean) => void
        },
        view: {
            value: 'table' | 'calendar',
            onChange: (d: 'table' | 'calendar') => void
        }
    }
}

const Toolbar = (props: ToolbarProps) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogCalendarOpen, setCalendarOpen] = useState(false)

    type DateSelectProps = {
        value: Date,
        onChange: (e: Date) => void
    }

    const DateSelect = (props: DateSelectProps) => {
        return (
            <input
                className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 dark:[color-scheme:dark] text-white hover:bg-slate-500 transition-all'
                type='date'
                value={props.value.toISOString().substring(0, 10)}
                onChange={e => props.onChange(new Date(e.currentTarget.value))}
            ></input>
        )
    }

    const SearchField = () => {
        return (
            <input
                className='focus:grow p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 dark:[color-scheme:dark] text-white hover:bg-slate-500 transition-all'
                type='search'
                placeholder='Search...'
            ></input>
        )
    }

    type IgnoreCompleteCheckBoxProps = {
        selected: boolean,
        onSelectionChange: (selected: boolean) => void
    }

    const IgnoreCompleteCheckBox = (props: IgnoreCompleteCheckBoxProps) => {

        return (
            <div
                className='inline-flex justify-center items-center gap-2 p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white hover:bg-slate-500 transition-all'
                onClick={() => props.onSelectionChange(!props.selected)}
            >
                <input
                    type='checkbox'
                    checked={props.selected}
                    onClick={() => props.onSelectionChange(!props.selected)}
                ></input>
                <label>Ignore Completed</label>
            </div>
        )
    }

    const IconButtonNew = () => {
        return (
            <button
                onClick={() => setDialogOpen(true)}
                className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white inline-flex gap-2 items-center hover:bg-slate-500 transition-all'
            >
                <AddIcon></AddIcon>
            </button>
        )
    }

    const ViewSwitchButton = (props: { view: 'table' | 'calendar', onChange: (view: 'table' | 'calendar') => void }) => {
        return (
            <div
                className='shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white inline-flex items-center'
            >
                <div
                    onClick={() => props.onChange('table')}
                    className={`p-2 hover:bg-slate-500 rounded-md transition-all ${props.view === 'table' ? 'bg-slate-500' : ''}`}
                >
                    <TableIcon></TableIcon>
                </div>
                <div
                    onClick={() => props.onChange('calendar')}
                    className={`p-2 hover:bg-slate-500 rounded-md transition-all ${props.view === 'calendar' ? 'bg-slate-500' : ''}`}
                >
                    <CalendarIcon></CalendarIcon>
                </div>
            </div >
        )
    }
    const [date, setDate] = useState(new Date())

    return (
        <>
            <Dialog
                title='Add new task'
                open={dialogOpen}
                onDismiss={() => setDialogOpen(false)}
            >
                <AddTaskForm></AddTaskForm>
            </Dialog>
            <Dialog
                title='Select a date'
                open={dialogCalendarOpen}
                onDismiss={() => setCalendarOpen(false)}
            >
                <CalendarSelect onSelect={(d) => { setDate(d) }} defaultValue={date}></CalendarSelect>
            </Dialog>
            <div className='flex flex-row gap-2'>
                <IconButtonNew></IconButtonNew>
                <ViewSwitchButton view={props.filter.view.value} onChange={e => props.filter.view.onChange(e)}></ViewSwitchButton>
                <DateSelect
                    value={props.filter.date.value}
                    onChange={(e) => props.filter.date.onChange(e)}
                ></DateSelect>
                <IgnoreCompleteCheckBox
                    onSelectionChange={e => props.filter.ignoreCompleted.onChange(e)}
                    selected={props.filter.ignoreCompleted.value}
                ></IgnoreCompleteCheckBox>
                <SearchField></SearchField>
                <div className='grow'></div>
            </div>
        </>
    )
}

export type TaskDateRowProps = {
    id: string,
    date: Date | null
}

const TaskDateRow = (props: TaskDateRowProps) => {

    const [dialogCalendarOpen, setCalendarOpen] = useState(false)
    const [date, setDate] = useState(props.date || new Date())

    return (
        <>
            <button
                className='hover:underline'
                onClick={() => setCalendarOpen(true)}
            >{props.date ? date.toDateString() : 'Assign Date'}</button>
            <Dialog
                title='Select a date'
                open={dialogCalendarOpen}
                onDismiss={() => setCalendarOpen(false)}
            >
                <form
                    action={async (fd) => {
                        await updateDate(fd)
                            .then((r) => {
                                setDate(new Date(JSON.parse(r.toString()).newDate))
                                setCalendarOpen(false)
                            })
                    }}
                    className='flex flex-col'>
                    <input
                        type='text'
                        hidden
                        defaultValue={'/apps/tasks'}
                        name='revPath'
                    >
                    </input>
                    <input
                        type='text'
                        name='id'
                        hidden
                        defaultValue={props.id}
                    >
                    </input>
                    <CalendarSelect onSelect={(d) => { setDate(d) }} defaultValue={date}></CalendarSelect>
                    <button
                        className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white items-center hover:bg-slate-500 transition-all'
                        type='submit'
                    >
                        Select
                    </button>
                </form>
            </Dialog>
        </>
    )
}

export type WithTaskId = {
    id: string
}

const TaskCompleteButton = (props: WithTaskId) => {
    return (
        <form
            action={completeTask}
        >
            <input
                type='text'
                defaultValue={props.id}
                hidden
                name='id'
            ></input>
            <input
                type='text'
                defaultValue={'Complete'}
                hidden
                name='status'
            ></input>
            <button className="font-medium text-green-500 hover:underline">Complete</button>
        </form>
    )
}

const TaskDeleteButton = (props: WithTaskId) => {
    return (
        <form
            action={deleteTask}
        >
            <input
                type='text'
                defaultValue={props.id}
                hidden
                name='id'
            ></input>
            <button className="font-medium text-red-500 hover:underline">Delete</button>
        </form>
    )
}

const TaskEditButton = (props: WithTaskId) => {
    return (
        <form>
            <input
                type='text'
                defaultValue={props.id}
                hidden
                name='id'
            ></input>
            <button className="font-medium text-blue-500 hover:underline">Edit</button>
        </form>
    )
}

type CalendarSelectProps = {
    defaultValue: Date,
    onSelect: (d: Date) => void
}

const CalendarSelect = (props: CalendarSelectProps) => {

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [selected, setSelected] = useState(props.defaultValue)
    const [month, setMonth] = useState(props.defaultValue.getMonth())
    const [year, setYear] = useState(props.defaultValue.getFullYear())

    const today = new Date().toISOString().substring(0, 10)

    const getDaysOfMonth = (year: number, monthIndex: number) => new Date(year, monthIndex + 1, 0).getDate()
    const getFirstWeekdayOfMonth = (year: number, monthIndex: number) => new Date(year, monthIndex, 1).getDay()

    const incrementMonth = () => setMonth(month + 1)
    const decrementMonth = () => setMonth(month - 1)

    useEffect(() => {
        if (month == 12) {
            setMonth(0)
            setYear(year + 1)
        } else if (month == -1) {
            setMonth(11)
            setYear(year - 1)
        }
    }, [month, year])

    return (
        <div>
            <div className='grid grid-cols-7 gap-2 select-none pb-2'>
                <button
                    type='button'
                    onClick={decrementMonth}
                    className='bg-slate-800 hover:bg-slate-500 text-center rounded-md h-8 w-8 content-center transition-all'
                >{'<'}</button>
                <p
                    className='bg-slate-800 text-center rounded-md h-8 content-center col-span-3'
                >{months[month]}</p>
                <p
                    className='bg-slate-800 text-center rounded-md h-8 content-center col-span-2'
                >{year}</p>
                <button
                    type='button'
                    onClick={incrementMonth}
                    className='bg-slate-800 hover:bg-slate-500 text-center rounded-md h-8 w-8 content-center transition-all'
                >{'>'}</button>
                {[...Array(7)].map((e, i) => {
                    return (
                        <div
                            key={i}
                            className={'text-center h-8 w-8 content-center'}
                        >
                            {days[i]}
                        </div>
                    )
                })}
                {[...Array(getFirstWeekdayOfMonth(year, month))].map((e, i) => {
                    return (
                        <div
                            className={'h-8 w-8 text-center content-center'}
                            key={i}
                        >
                        </div>
                    )
                })}
                {[...Array(getDaysOfMonth(year, month))].map((e, i) => {

                    const getIndex = (year: number, month: number, day: number) => {
                        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
                    }

                    const isToday = getIndex(year, month + 1, i + 1) === today

                    return (
                        <div
                            key={getIndex(year, month + 1, i + 1)}
                            className={`${isToday ? 'bg-slate-500' : 'bg-slate-800'} ${selected.toISOString().substring(0, 10) == getIndex(year, month + 1, i + 1) ? 'ring ring-blue-300' : ''} hover:bg-slate-500 text-center rounded-md h-8 w-8 content-center transition-all`}
                            onClick={() => setSelected(new Date(getIndex(year, month + 1, i + 1)))}
                        >
                            {i + 1}
                        </div>
                    )
                })}
                {[...Array(42 - getDaysOfMonth(year, month) - getFirstWeekdayOfMonth(year, month))].map((e, i) => {
                    return (
                        <div
                            className={'h-8 w-8 text-center content-center'}
                            key={i}
                        >
                        </div>
                    )
                })}
            </div>
            <input name='date' hidden readOnly value={selected.toISOString()}></input>
        </div>
    )
}

const AddTaskForm = () => {

    const initialState = {
        error: '',
        message: ''
    }

    const [state, formAction] = useFormState(addTask, initialState)
    const { pending } = useFormStatus()

    return (
        <form action={formAction}>
            <p className='pb-2 text-center text-red-400'>{state?.errors}</p>
            <div className='flex flex-col gap-4 w-96'>
                <div className='flex flex-col gap-6 overflow-auto p-2'>
                    <input
                        className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white hover:bg-slate-500 transition-all'
                        type='text'
                        placeholder='Name'
                        name='task_name'
                    ></input>
                    <textarea
                        name='task_description'
                        placeholder='Description'
                        className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white hover:bg-slate-500 transition-colors'>
                    </textarea>
                    <input
                        name='task_due_to'
                        type='date'
                        placeholder='Due to'
                        className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 dark:[color-scheme:dark] text-white hover:bg-slate-500 transition-all'
                    ></input>
                    <div className='h-[2px] border border-slate-500'></div>
                </div>
                <button
                    disabled={pending}
                    type='submit'
                    className='p-2 shadow-lg shadow-slate-800 rounded-md bg-slate-600 text-white items-center hover:bg-slate-500 transition-all'
                >Add</button>
            </div>
        </form>
    )
}

export { TableDeleteButton, AddTaskForm, DropDownMenu, Toolbar, Dialog, TaskDateRow, TaskCompleteButton, TaskEditButton, TaskDeleteButton, TaskViewWithToolbar }