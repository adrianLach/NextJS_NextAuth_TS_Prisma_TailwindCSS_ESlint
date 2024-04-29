import authOptions from '@/auth'
import { prisma } from '@/prismaClient'
import { getServerSession } from 'next-auth'

const getUserId = async () => {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email)
        throw 'Invalid session | User is not signed in'

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            id: true
        }
    })

    if (!user)
        throw 'Invalid user | E-Mail is unknown'

    return user.id

}

export { getUserId }