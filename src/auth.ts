import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from './prismaClient'
import { checkEnv } from './checks'

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: checkEnv('GITHUB_ID') ,
            clientSecret: checkEnv('GITHUB_SECRET'),
        }),
    ],
    adapter: PrismaAdapter(prisma),
}

export default authOptions