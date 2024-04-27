import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-dvh bg-slate-700'>
            {children}
        </div>)
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthSessionProvider>
                    <Layout>
                        {children}
                    </Layout>
                </NextAuthSessionProvider>
            </body>
        </html>
    )
}
