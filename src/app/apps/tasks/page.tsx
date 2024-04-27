'use server'

import authOptions from '@/auth'
import Badge from '@/components/Badge'
import { BinIcon } from '@/components/Icons'
import { prisma } from '@/prismaClient'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

type Tasks = {
    id: string
    name: string
    status: string
    dueTo: Date | null
}

type SSProps = {
    data?: Tasks[],
    error?: string
}

const getUserId = async () => {
    const session = await getServerSession(authOptions)

    if(!session || !session.user || !session.user.email)
        throw 'Invalid session | User is not signed in'

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            id: true
        }
    })

    if(!user)
        throw 'Invalid user | E-Mail is unknown'

    return user.id

}

const getData = async () => {
    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return {error: error as string}        
    }

    const tasks: Tasks[] = await prisma.task.findMany({
        where: {
            userId: userId
        },
        select: {
            name: true,
            dueTo: true,
            id: true,
            status: true
        }
    })

    return {data: tasks}
}

const deleteTask = async ({id}: {id: string}) => {

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return {error: error}        
    }

    const deleted = await prisma.task.delete({
        where: {
            userId: userId,
            id: id
        }
    })

    return {deletedId: deleted.id}
}


const addDummyTask = async ({name, dueTo}: {name: string, dueTo?: Date}) => {

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return {error: error}        
    }

    const insert = await prisma.task.create({
        data: {
            userId: userId,
            name: name,
            dueTo: dueTo,
            status: 'todo'
        }
    })

    return {insertedId: insert.id}
}

export default async function Tasks() {

    const props: SSProps = await getData()

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
                <p>{props.error}</p>
            </div>
        )

    return (
        <main className='text-white w-full p-8'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='text-start'>Status</th>
                        <th className='text-start'>Task</th>
                        <th className='text-end'>Due to</th>
                        <th className='text-end'></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((e, i) => <tr key={i}>
                        <td><Badge text={e.status} status={getStatusCode(e.status)}></Badge></td>
                        <td>{e.name}</td>
                        <td className='text-end'>{e.dueTo ? e.dueTo.toLocaleDateString('de-DE', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}) : '-'}</td>
                        <td className='text-end'>
                            <form action={() => {
                                'use server'
                                deleteTask({id: e.id})
                                revalidatePath('/apps/tasks')
                            }}>
                                <button type='submit'>
                                    <BinIcon size={24} className='dark:text-red-500 hover:bg-red-500 hover:text-white hover:rounded-md transition-all'></BinIcon>
                                </button>
                            </form>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <form action={() => {
                'use server'
                addDummyTask({name: 'Dummy Task'})
                revalidatePath('/apps/tasks')
            }}>
                <button type='submit'>Add Dummy Task</button>
            </form>
        </main>
    )
}
