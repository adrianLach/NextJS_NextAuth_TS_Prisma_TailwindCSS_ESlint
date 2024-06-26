import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from './prismaClient'
import { checkEnv } from './checks'

//https://next-auth.js.org/configuration/providers/oauth#built-in-providers
export const authOptions = {
    providers: [
        GithubProvider({
            clientId: checkEnv('GITHUB_ID') ,
            clientSecret: checkEnv('GITHUB_SECRET'),
        }),
    ],
    //https://next-auth.js.org/adapters
    adapter: PrismaAdapter(prisma),
}

export default authOptions