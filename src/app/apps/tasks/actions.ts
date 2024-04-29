'use server'

import { getUserId } from '@/app/actions'
import { prisma } from '@/prismaClient'
import { revalidatePath } from 'next/cache'


export type Tasks = {
    id: string
    name: string
    status: string
    description: string | null
    dueTo: Date | null
}

export type SSProps = {
    data?: Tasks[],
    error?: string
}

const getData = async () => {
    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return JSON.stringify({ error: error as string })
    }

    const tasks: Tasks[] = await prisma.task.findMany({
        where: {
            userId: userId
        },
        select: {
            name: true,
            dueTo: true,
            id: true,
            status: true,
            description: true
        }
    })

    return JSON.stringify({ data: tasks })
}

const deleteTask = async (formData: FormData) => {

    const id = formData.get('id')?.toString()

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { error: error }
    }

    if (!id)
        return { error: 'ID is requited' }

    const deleted = await prisma.task.delete({
        where: {
            userId: userId,
            id: id
        }
    })

    revalidatePath(formData.get('route')?.toString() || '')

    return JSON.stringify({ deletedId: deleted.id })
}

const addTask = async (formData: FormData) => {

    const taskName = formData.get('task_name')?.toString()
    const taskDescription = formData.get('task_description')?.toString()
    const taskDueTo = formData.get('task_due_to')?.toString()

    if (!taskName)
        throw 'taskName must be provided!'

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { error: error }
    }

    const insert = await prisma.task.create({
        data: {
            userId: userId,
            name: taskName,
            description: taskDescription,
            dueTo: taskDueTo ? new Date(Date.parse(taskDueTo)) : null,
            status: 'todo'
        }
    })

    revalidatePath(formData.get('route')?.toString() || '')

    return JSON.stringify({ insertedId: insert.id })
}

export { getData, deleteTask, addTask }