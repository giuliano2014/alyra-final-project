import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'

const Team = () => {
    return (
        <>
            <Head>
                <title>HydrInvest - Team</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box textAlign='center'>
                <Heading size='xl'>Team</Heading>
                <Text fontSize='xl' mt='10'>Multiply your exposure to your favorite crypto assets. Browse our featured products or select a asset.</Text>
                <Text fontSize='xl'>We&apos;ve launched Multiply for Aave.</Text>
            </Box>
        </>
    )
}

export default Team
