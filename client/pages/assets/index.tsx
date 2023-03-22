import {
    Button,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    StackDivider,
    Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Head from 'next/head'

const Assets = () => {
    return (
        <>
            <Head>
                <title>HydrInvest - Assets</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box textAlign='center'>
                <Heading size='2xl'>Assets</Heading>
                <Text fontSize='xl' mt='10'>Multiply your exposure to your favorite crypto assets. Browse our featured products or select a asset.</Text>
                <Text fontSize='xl'>We&apos;ve launched Multiply for Aave.</Text>
            </Box>

            <SimpleGrid minChildWidth='xs' mt='20' spacing='40px'>
                <Card bg='purple.50' borderRadius='2xl' w='100%'>
                    <CardHeader>
                        <Heading size='lg'>Asset 19</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Summary
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    View a summary of all your clients over the last month.
                                </Text>
                            </Box>
                            <Card bg='purple.100' borderRadius='2xl'>
                                <CardBody textAlign='center'>
                                    <Text>With 100 ETH 👇</Text>
                                    <Heading size='xs'>Get up to 571 ETH exposure</Heading>
                                </CardBody>
                            </Card>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Overview
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    Check out the overview of your clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Analysis
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <Divider color='#e2e8f0' />
                    <CardFooter justifyContent='end'>
                        <Button as={NextLink} bg='purple.900' color='white' colorScheme='purple'  href='/assets/19'>
                            Buy now
                        </Button>
                    </CardFooter>
                </Card>
                <Box bg='purple.50' borderRadius='2xl' height='80px'></Box>
                <Box bg='purple.50' borderRadius='2xl' height='80px'></Box>
                <Box bg='purple.50' borderRadius='2xl' height='80px'></Box>
                <Box bg='purple.50' borderRadius='2xl' height='80px'></Box>
            </SimpleGrid>
        </>
    )
}

export default Assets
