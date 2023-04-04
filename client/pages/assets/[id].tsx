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
    useToast
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useSigner } from 'wagmi'

import { financialVehicleContractAddress, financialVehicleAbi } from '@/contracts/financialVehicle'

const SingleAsset = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: signer } = useSigner()
    const [numberOfToken, setNumberOfToken] = useState(0)
    const toast = useToast()

    const isNumberOfTokenError = numberOfToken < 1

    const buyToken = async (event: FormEvent) => { // TODO: dynamically pass asset address, on line 74
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
                '0xCafac3dD18aC6c6e92c921884f9E4176737C052c',
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
        </>
    )
}

export default SingleAsset
