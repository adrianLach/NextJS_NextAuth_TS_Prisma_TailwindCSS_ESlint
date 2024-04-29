'use server'

import Image from 'next/image'
import AppsLayout from '../apps/layout'
import { getUserAndAccount } from './actions'

export default async function Tasks() {

    const user = await getUserAndAccount()

    const TableRow = (props: {label: string, value: string | null}) => {
        return (
            <tr className='border-b border-b-white'>
                <td className='text-lg px-4 font-bold select-none'>{props.label}</td>
                <td className='text-end px-4'>{props.value}</td>
            </tr>
        )
    }

    const TableRowTitle = (props: {label: string}) => {
        return (
            <tr className='border-b border-b-white'>
                <td colSpan={2} className='text-lg text-center px-4 font-bold select-none'>{props.label}</td>
            </tr>
        )
    }

    return (
        <AppsLayout>
            <main className='text-white w-full p-4 flex flex-col items-center gap-8'>
                <div className='text-white p-4 inline-flex flex-row border-2 border-white rounded-lg gap-4'>
                    <Image className='rounded-2xl' src={user.image || ''} alt='UserImage' width={256} height={256}></Image>
                    <div className='flex flex-col items-end'>
                        <table>
                            <tbody>
                                <TableRowTitle label='User'></TableRowTitle>
                                <TableRow label='ID' value={user.id}></TableRow>
                                <TableRow label='Name' value={user.name}></TableRow>
                                <TableRow label='E-Mail' value={user.email}></TableRow>
                                <TableRowTitle label='Accounts'></TableRowTitle>
                                {user.Account.map(e => <TableRow key={e.id} label={e.provider} value={e.providerAccountId}></TableRow>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-center w-full'>
                        Type <span className='font-bold'>DELETE</span> to verify.
                    </div>
                    <input type='text' className='text-center bg-slate-900 w-96 p-2 text-white rounded-md'></input>
                    <button
                        className='bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2 rounded-xl text-xl transition-all'
                    >
                        Delete Account
                    </button>
                </div>
            </main>
        </AppsLayout>
    )
}
