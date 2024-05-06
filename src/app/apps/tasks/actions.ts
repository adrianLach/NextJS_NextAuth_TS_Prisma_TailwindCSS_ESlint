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

const completeTask = async (formData: FormData) => {

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { errors: error }
    }

    const taskId = formData.get('id')?.toString()
    const status = formData.get('status')?.toString()
    const revPath = formData.get('revPath')?.toString() || ''

    if (!taskId)
        return { errors: 'ID is requited' }

    const updated = await prisma.task.update({
        where: {
            id: taskId,
            userId: userId,

        },
        data: {
            status: status
        }
    })

    revalidatePath(revPath)

    return JSON.stringify({ newStatus: updated.status })

}
const updateDate = async (formData: FormData) => {

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { errors: error }
    }

    const taskId = formData.get('id')?.toString()
    const date = formData.get('date')?.toString()
    const revPath = formData.get('revPath')?.toString() || ''
    const dateObj = date ? new Date(date) : null

    console.dir(formData)

    if (!taskId)
        return { errors: 'ID is requited' }

    const updated = await prisma.task.update({
        where: {
            id: taskId,
            userId: userId,

        },
        data: {
            dueTo: dateObj
        }
    })

    console.log(updated)

    revalidatePath(revPath)

    return JSON.stringify({ newDate: updated.dueTo })

}

const deleteTask = async (formData: FormData) => {

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { errors: error }
    }

    const taskId = formData.get('id')?.toString()
    const revPath = formData.get('revPath')?.toString() || ''

    if (!taskId)
        return { errors: 'ID is requited' }

    const deleted = await prisma.task.delete({
        where: {
            userId: userId,
            id: taskId
        }
    })

    revalidatePath(revPath)

    return JSON.stringify({ deletedId: deleted.id })
}

const addTask = async (prevState: unknown, formData: FormData) => {

    const taskName = formData.get('task_name')?.toString()
    const taskDescription = formData.get('task_description')?.toString()
    const taskDueTo = formData.get('task_due_to')?.toString()

    if (!taskName)
        return {
            errors: 'Please provide a task name.'
        }

    let userId = ''
    try {
        userId = await getUserId()
    } catch (error) {
        return { errors: error as string }
    }

    const insert = await prisma.task.create({
        data: {
            userId: userId,
            name: taskName,
            description: taskDescription,
            dueTo: taskDueTo ? new Date(Date.parse(taskDueTo)) : null,
            status: 'minor'
        }
    })

    revalidatePath(formData.get('route')?.toString() || '')

    return {
        message: insert.id
    }
}

export { getData, deleteTask, addTask, updateDate, completeTask }