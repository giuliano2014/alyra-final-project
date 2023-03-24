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
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Nos actifs</Heading>
                <Text fontSize='xl' mt='10'>Multipliez votre exposition à vos crypto actifs préférés.</Text>
                <Text fontSize='xl'>Parcourez nos produits ou sélectionnez un actif.</Text>
            </Box>
            <SimpleGrid minChildWidth='xs' mt='20' spacing='40px'>
                <Card borderRadius='2xl' w='100%'>
                    <CardHeader>
                        <Heading size='md'>Sustainable Forestry</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Nature de l&apos;actif
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    Portefeuille diversifié d’actifs forestiers
                                </Text>
                            </Box>
                            <Card bg='teal.100' borderRadius='2xl'>
                                <CardBody textAlign='center'>
                                    <Text>Avec 100 USDC 👇</Text>
                                    <Heading size='xs'>Obtenez 1 SFT</Heading>
                                </CardBody>
                            </Card>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Nom du token de l&apos;actif
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    SFT pour Sustainable Forestry Token
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Nombre de token émis
                                </Heading>
                                <Text fontSize='sm' pt='2'>
                                    10 000
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <Divider color='#e2e8f0' />
                    <CardFooter justifyContent='end'>
                        <Button
                            as={NextLink}
                            color='white'
                            colorScheme='blue'
                            href='/assets/sustainable-forestry'
                        >
                            En savoir plus
                        </Button>
                    </CardFooter>
                </Card>
                <Box bg='gray.100' borderRadius='2xl' height={{ base: '80px', md: 'auto' }}></Box>
                <Box bg='gray.100' borderRadius='2xl' height={{ base: '80px', md: 'auto' }}></Box>
                <Box bg='gray.100' borderRadius='2xl' height='80px'></Box>
                <Box bg='gray.100' borderRadius='2xl' height='80px'></Box>
            </SimpleGrid>
        </>
    )
}

export default Assets
