'use server'

import { getData, SSProps } from './actions'
import { TaskViewWithToolbar } from './components'

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

    return (
        <main>
            {props.data && <TaskViewWithToolbar tasks={props.data}></TaskViewWithToolbar>}
        </main>
    )
}
