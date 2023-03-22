import {
    Button,
    Box,
    Card,
    CardBody,
    CardHeader,
    Container,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SingleAsset = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Head>
                <title>HydrInvest - Single Asset</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box pb='4' pl='4' pr='4' pt='20'>
                <Container maxW='container.xl'>
                    <Box textAlign='center'>
                        <Heading size='2xl'>Asset : {id}</Heading>
                        <Text fontSize='xl' mt='10'>Multiply your exposure to your favorite crypto assets. Browse our featured products or select a asset.</Text>
                        <Text fontSize='xl'>We&apos;ve launched Multiply for Aave.</Text>
                    </Box>
                    <SimpleGrid gridTemplateColumns={{ md: '60% 1fr' }} mt='20' spacing='40px'>
                        <Card borderRadius='2xl'>
                            <CardHeader>
                                <Heading size='md'>Overview</Heading>
                            </CardHeader>
                            <Divider color='#e2e8f0' />
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
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            More
                                        </Heading>
                                        <Text fontSize='sm' pt='2'>
                                            See more details about this asset.
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card borderRadius='2xl'>
                            <CardHeader>
                                <Heading size='md'>Buy Asset Token</Heading>
                            </CardHeader>
                            <Divider color='#e2e8f0' />
                            <CardBody>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Deposit ETH
                                    </Heading>
                                    <InputGroup mt='4' size='md'>
                                        <Input
                                            placeholder='0 ETH'
                                            pr='4.5rem'
                                            type='number'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm'>
                                                Buy
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Box>
                                <Card bg='#F3F7F9' borderRadius='2xl' mt='4'>
                                    <CardBody>
                                        <Heading size='xs'>Order information</Heading>
                                        <Flex gap='4' justifyContent='space-between'>
                                            <Text fontSize='sm' pt='2'>
                                                Buying ETH
                                            </Text>
                                            <Text fontSize='sm' pt='2'>
                                                0.25335 ETH $461.82
                                            </Text>
                                        </Flex>
                                        <Flex gap='4' justifyContent='space-between'>
                                            <Text fontSize='sm' pt='2'>
                                                Total collateral
                                            </Text>
                                            <Text textAlign='right' fontSize='sm' pt='2'>
                                                0.00000 ETH - 1.25258 ETH
                                            </Text>
                                        </Flex>
                                        <Flex gap='4' justifyContent='space-between'>
                                            <Text fontSize='sm' pt='2'>
                                                Transaction fee
                                            </Text>
                                            <Text fontSize='sm' pt='2'>
                                                0.924257 USDC
                                            </Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                                <Card bg='teal.100' borderRadius='2xl' color='teal' mt='4'>
                                    <CardBody>
                                        <Heading size='xs'>Success information</Heading>
                                        <Text fontSize='sm' pt='2'>
                                            Buying ETH
                                        </Text>
                                    </CardBody>
                                </Card>
                                <Card bg='orange.200' borderRadius='2xl' color='orange' mt='4'>
                                    <CardBody>
                                        <Heading size='xs'>Warning information</Heading>
                                        <Text fontSize='sm' pt='2'>
                                            Buying ETH
                                        </Text>
                                    </CardBody>
                                </Card>
                                <Card bg='red.200' borderRadius='2xl' color='red' mt='4'>
                                    <CardBody>
                                        <Heading size='xs'>Error information</Heading>
                                        <Text fontSize='sm' pt='2'>
                                            Buying ETH
                                        </Text>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    )
}

export default SingleAsset
