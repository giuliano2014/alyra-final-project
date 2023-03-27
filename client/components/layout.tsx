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
            <Box alignItems='center' bg='gray.50' display='flex' minH='100vh' pb='4' pl='4' pr='4' pt='72px'>
                <Container maxW='container.xl'>
                    {children}
                </Container>
            </Box>
        </>
    )
}

export default Layout
