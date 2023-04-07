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
                <Heading size='xl'>L&apos;équipe</Heading>
            </Box>
        </>
    )
}

export default Team
