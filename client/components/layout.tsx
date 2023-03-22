import { Box, Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

import Navbar from '@/components/navbar'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
    return (
        <>
            <Navbar />
            <Box bg='gray.50' minH='calc(100vh - 72px)' pb='4' pl='4' pr='4' pt='20'>
                <Container maxW='container.xl'>
                    {children}
                </Container>
            </Box>
        </>
    )
}

export default Layout
