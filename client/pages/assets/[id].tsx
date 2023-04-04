import {
    Button,
    Box,
    Card,
    CardBody,
    CardHeader,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useToast,
    Alert,
    AlertIcon,
    Link,
    AlertDescription,
    AlertTitle
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import NextLink from 'next/link'

import { financialVehicleContractAddress, financialVehicleAbi } from '@/contracts/financialVehicle'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'
import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'

const SingleAsset = () => {
    const { address } = useAccount()
    const router = useRouter()
    const { id } = router.query
    const isAccountConnected = useIsAccountConnected()
    const { data: signer } = useSigner()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [numberOfToken, setNumberOfToken] = useState(0)
    const toast = useToast()

    const isNumberOfTokenError = numberOfToken < 1

    const [isValidated, setIsValidated] = useState(false)

    useEffect(() => {
        const adminAddresses = [
            process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_ARNAUD,
            process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GARY,
            process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GIULIANO,
            process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GIULIANO_LOCALHOST,
            process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_VINCENT
        ]
    
        setIsAdmin(adminAddresses.includes(address))
    }, [address])

    useEffect(() => {
        getKycValidationByAddress()
    }, [address])
  
    const buyToken = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return
    
            if (!financialVehicleContractAddress) {
                throw new Error("financialVehicleContractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)

            // const price = await contract.getPrice(assetAddress)
            // const amountBigNumber = ethers.utils.parseEther(amount.toString())
            // console.log('amountBigNumber', amountBigNumber.toString())

            // const numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18)
            // console.log('numberOfTokens', numberOfTokens.toString())
    
            // const value = ethers.utils.parseEther((amount * 0.01).toString())
            // console.log('value', value.toString())
    
            // const result = await contract.buyToken(assetAddress, numberOfTokens, { value: value })
            // const result = await contract.buyToken(assetAddress, "1000", { value: ethers.utils.parseEther("10") })

            // const result = await contract.buyToken(assetAddress, ethers.utils.parseEther("150").toString(), { value: ethers.utils.parseEther("150") })

            const formattedNumberOfToken = ethers.utils.parseEther(numberOfToken.toString()).toString()

            await contract.buyToken(
                id,
                formattedNumberOfToken,
                { value: formattedNumberOfToken }
            )

            toast({
                title: 'Bravo !',
                description: `Votre achat de ${numberOfToken} token(s), a bien été effectué.`,
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.error("An error occured on buy token :", error)
            toast({
                title: 'Oups !',
                description: "Une erreur s'est produite :(",
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const getKycValidationByAddress = async () => {
        const query = `
            query KycValidations($userAddress: String!) {
                kycValidations(where: { userAddress: $userAddress }) {
                    isValidated
                    userAddress
                    validationStatus
                }
            }
        `
    
        const res = await fetch(
            process.env.NEXT_PUBLIC_HYGRAPH_API_URL || '',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        userAddress: address
                    }
                })
            }
        )
    
        const data = await res.json()
        setIsValidated(data?.data?.kycValidations[0]?.isValidated)
    }

    return (
        <>
            <Head>
                <title>HydrInvest - Single Asset</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Asset : {id}</Heading>
                <Text fontSize='xl' mt='10'>Multiply your exposure to your favorite crypto assets.</Text>
                <Text fontSize='xl'>Browse our featured products or select a asset.</Text>
                {!isAccountConnected &&
                    <Box mt='10'>
                        <AccountNotConnectedWarning />
                    </Box>
                }
            </Box>
            {isAccountConnected &&
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
                            <Heading size='md'>Acheter des tokens</Heading>
                        </CardHeader>
                        <Divider color='#e2e8f0' />
                        <CardBody>
                            <Box as='form' onSubmit={buyToken}>
                                <FormControl isInvalid={isNumberOfTokenError}>
                                    <FormLabel fontSize='sm'>Entrez le nombre de token que vous souhaitez acheter</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            defaultValue={0}
                                            min={1}
                                            onChange={(e: any) => setNumberOfToken(e.target.value)}
                                            pr='6.5rem'
                                            step={1}
                                            type='number'
                                        />
                                        <InputRightElement width='6.5rem'>
                                            <Button
                                                h='1.75rem'
                                                isDisabled={
                                                    isAdmin ||
                                                    isNumberOfTokenError
                                                }
                                                size='sm'
                                                type='submit'
                                            >
                                                Acheter
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {isNumberOfTokenError ? (
                                        <FormErrorMessage>Le nombre total de token est obligatoire et doit être supérieur ou égal à 1.</FormErrorMessage>
                                    ) : (
                                        <FormHelperText>
                                            Le nombre total de token doit être supérieur ou égal à 1.
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {isAdmin &&
                                    <Stack mt='5'>
                                        <Alert status='warning'>
                                            <AlertIcon />
                                            Veuillez vous connecter à un compte utilisateur, non administrateur.
                                        </Alert>
                                    </Stack>
                                }
                                {!isValidated && !isAdmin &&
                                     <Stack mt='5'>
                                        <Alert status='error'>
                                            <AlertIcon />
                                            <AlertTitle fontWeight='normal'>
                                                Pour acheter des tokens, faites une demande de validation de KYC, <Link as={NextLink} href='/account/board'>ici</Link>.
                                            </AlertTitle>
                                        </Alert>
                                    </Stack>
                                }
                                {/* <Stack spacing={3}>
                                    <Alert status='error'>
                                        <AlertIcon />
                                        There was an error processing your request
                                    </Alert>
                                
                                    <Alert status='success'>
                                        <AlertIcon />
                                        Data uploaded to the server. Fire on!
                                    </Alert>
                                
                                    <Alert status='warning'>
                                        <AlertIcon />
                                        Seems your account is about expire, upgrade now
                                    </Alert>
                                
                                    <Alert status='info'>
                                        <AlertIcon />
                                        Chakra is going live on August 30th. Get ready!
                                    </Alert>
                                </Stack> */}
                            </Box>
                            {/* <Card bg='#F3F7F9' borderRadius='2xl' mt='4'>
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
                            </Card> */}
                        </CardBody>
                    </Card>
                </SimpleGrid>
            }
        </>
    )
}

export default SingleAsset
