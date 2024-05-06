import { AdminIcon, CheckCircleIcon, HomeSolidIcon, LinkIcon, ProfileCardIcon, SettingsIcon } from '@/components/Icons'
import Link from 'next/link'

export default function AppsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const MenuItem = ({href, icon, name}: {href: string, icon: React.ReactNode, name: string}) => {
        
        return <Link href={href} className='flex flex-row items-center gap-4 hover:bg-slate-600 hover:rounded-md p-2 transition-all'>
            {icon}
            <p className='text-xl text-white md:block hidden'>{name}</p>
        </Link>
    }

    return (
        <div className='flex w-screen bg-slate-700 h-screen'>
            <div className='flex flex-col bg-slate-800 h-full'>
                <div className='h-16 bg-slate-800 w-full flex flex-col justify-center pl-4'>
                    <Link href={'/apps'}  className='flex flex-row items-end'>
                        <HomeSolidIcon size={48} className='text-white'></HomeSolidIcon>
                        <p className='text-3xl text-white font-bold md:block hidden'>Arco</p>
                    </Link>
                </div>
                <nav className='h-full flex flex-col gap-2 justify-start p-4'>
                    <MenuItem href='/apps/shortcuts' icon={<LinkIcon size={32} className='text-white'></LinkIcon>} name='Shortcuts'></MenuItem>
                    <MenuItem href='/apps/tasks' icon={<CheckCircleIcon size={32} className='text-white'></CheckCircleIcon>} name='Tasks'></MenuItem>
                    <div className='grow'></div>
                    <div className='h-[2px] border border-slate-500'></div>
                    <MenuItem href='/account' icon={<ProfileCardIcon size={32} className='text-white'></ProfileCardIcon>} name='Account'></MenuItem>
                    <MenuItem href='/apps' icon={<SettingsIcon size={32} className='text-white'></SettingsIcon>} name='Settings'></MenuItem>
                    <MenuItem href='/apps' icon={<AdminIcon size={32} className='text-white'></AdminIcon>} name='Admin'></MenuItem>
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
