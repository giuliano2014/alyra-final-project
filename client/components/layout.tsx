import { ReactNode } from 'react'

import Navbar from '@/components/navbar'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default Layout
