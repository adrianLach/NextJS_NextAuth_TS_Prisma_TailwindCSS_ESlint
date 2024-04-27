import { CheckCircleIcon, CheckCircleSolidIcon, HomeIcon, HomeSolidIcon } from '@/components/Icons'

export default function Home() {

    return (
        <main className='h-full flex items-center justify-center'>
            <HomeIcon></HomeIcon>
            <HomeIcon className='dark:text-green-400'></HomeIcon>
            <HomeSolidIcon className='dark:text-green-400' size={48}></HomeSolidIcon>
            <CheckCircleIcon></CheckCircleIcon>
            <CheckCircleSolidIcon></CheckCircleSolidIcon>
        </main>
    )
}