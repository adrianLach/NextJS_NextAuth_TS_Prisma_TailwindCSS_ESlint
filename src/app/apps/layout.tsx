import { CheckCircleIcon, HomeSolidIcon, LinkIcon, ProfileCardIcon, SettingsIcon } from '@/components/Icons'
import Link from 'next/link'

export default function AppsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className='flex w-screen bg-slate-700 h-screen'>
            <div className='flex flex-col bg-slate-800 h-full'>
                <div className='h-16 bg-slate-800 w-full flex flex-col justify-center pl-4'>
                    <Link href={'/apps'}  className='flex flex-row items-end'>
                        <HomeSolidIcon size={48} className='dark:text-white'></HomeSolidIcon>
                        <p className='text-3xl dark:text-white font-bold md:block hidden'>Arco</p>
                    </Link>
                </div>
                <nav className='h-full flex flex-col gap-2 justify-start p-4'>
                    <Link href={'/apps'} className='flex flex-row items-center gap-4 hover:bg-slate-600 hover:rounded-md p-2 transition-all'>
                        <LinkIcon size={32} className='dark:text-white'></LinkIcon>
                        <p className='text-xl dark:text-white md:block hidden'>Shortcuts</p>
                    </Link>
                    <Link href={'/apps/tasks'} className='flex flex-row items-center gap-4 hover:bg-slate-600 hover:rounded-md p-2 transition-all'>
                        <CheckCircleIcon size={32} className='dark:text-white'></CheckCircleIcon>
                        <p className='text-xl dark:text-white md:block hidden'>Tasks</p>
                    </Link>
                    <div className='grow'></div>
                    <div className='h-[2px] border border-slate-500'></div>
                    <Link href={'/apps'} className='flex flex-row items-center gap-4 hover:bg-slate-600 hover:rounded-md p-2 transition-all'>
                        <ProfileCardIcon size={32} className='dark:text-white'></ProfileCardIcon>
                        <p className='text-xl dark:text-white md:block hidden'>Account</p>
                    </Link>
                    <Link href={'/apps'} className='flex flex-row items-center gap-4 hover:bg-slate-600 hover:rounded-md p-2 transition-all'>
                        <SettingsIcon size={32} className='dark:text-white'></SettingsIcon>
                        <p className='text-xl dark:text-white md:block hidden'>Settings</p>
                    </Link>
                </nav>
            </div>
            <div className='flex w-full flex-col h-full'>
                <div className='h-16 w-full bg-slate-800'>

                </div>
                <div className='h-full overflow-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}
