import { Box, Button, Container, Heading, Highlight, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'

const Home = () => {
    return (
        <>
            <Head>
                <title>Alyra Final Project</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box mt={{ base: '16', md: '0' }} textAlign={{ base: 'left', md: 'center' }}>
                <Container maxW='container.lg'>
                    <Heading lineHeight='taller' size='lg'>
                        <Highlight
                            query={['HydrInvest', 'plateforme', 'investissement Web3']}
                            styles={{ bg: 'teal.100', px: '4', py: '2', rounded: 'full' }}
                        >
                            HydrInvest est la première plateforme européenne d’investissement Web3 dédiée aux actifs responsables.
                        </Highlight>
                    </Heading>
                    <Text fontSize='xl' fontWeight='bold' mt={{ base: '6', md: '20' }}>
                        <Highlight
                            query={['actifs responsables']}
                            styles={{ bg: 'teal.100', px: '2', py: '1', rounded: 'full' }}
                        >
                            Investissez dans des actifs responsables de grande qualité de manière simple et rapide.
                        </Highlight>
                    </Text>
                    <Text fontSize='xl' fontWeight='bold' mt='6'>
                        <Highlight
                            query={['tokénisation']}
                            styles={{ bg: 'teal.100', px: '4', py: '2', rounded: 'full' }}
                        >
                            Nous vous proposons d’accéder grâce à la tokénisation à une large gamme d’actifs (forêt, énergies renouvelables, private equity à impact, ...).
                        </Highlight>
                    </Text>
                    <Text fontSize='xl' fontWeight='bold' mt='6'>
                        <Highlight
                            query={['actifs responsables']}
                            styles={{ bg: 'teal.100', px: '4', py: '2', rounded: 'full' }}
                        >
                            Investissez en fonction de vos moyens et participez activement aux défis de notre monde.
                        </Highlight>
                    </Text>
                    <Button as={NextLink} color='white' colorScheme='blue'  href='/assets' mt='10'>
                        Découvrir nos actifs
                    </Button>
                </Container>
            </Box>
        </>
    )
}

export default Home
