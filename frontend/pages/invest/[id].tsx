import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    AlertTitle,
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
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useAccount, useContractEvent, useSigner } from 'wagmi'

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import { financialVehicleContractAddress, financialVehicleAbi } from '@/contracts/financialVehicle'
import useAdminCheck from '@/hooks/useAdminCheck'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const SingleAsset = () => {
    const { address } = useAccount()
    const isAdmin = useAdminCheck()
    const isAccountConnected = useIsAccountConnected()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const { id } = router.query
    const { data: signer } = useSigner()
    const [isBuyingToken, setIsBuyingToken] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [numberOfToken, setNumberOfToken] = useState(0)
    const [sellingStatus, setSellingStatus] = useState(0)
    const toast = useToast()

    const isNumberOfTokenError = numberOfToken < 1

    useEffect(() => {
        getKycValidationByAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    // @TODO: modify this function with right dependencies for performance
    useEffect(() => {
        getSellingStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })
  
    const buyToken = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return
    
            if (!financialVehicleContractAddress) {
                throw new Error("financialVehicleContractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const formattedNumberOfToken = ethers.utils.parseEther(numberOfToken.toString()).toString()

            await contract.buyToken(
                id,
                formattedNumberOfToken,
                { value: formattedNumberOfToken }
            )

            toast({
                title: 'Bravo :)',
                description: `Votre achat de ${numberOfToken} token(s), a bien été effectué`,
                status: 'success',
                duration: 5000,
                isClosable: true
            })

            setIsBuyingToken(true)
        } catch (error) {
            console.error("An error occured on buy token :", error)
            toast({
                title: 'Oups :(',
                description: "Une erreur s'est produite",
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

    const getSellingStatus = async () => {
        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            if (!id) return

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const result = await contract.sellingStatus(id)
            setSellingStatus(result)
        } catch (error) {
            console.error("An error occured on getSellingStatus :", error)
        }
    }

    useContractEvent({
        address: financialVehicleContractAddress as any,
        abi: financialVehicleAbi,
        eventName: 'SellingStatusChange',
        listener(assetAddress, newStatus) {
            if (assetAddress !== id) return
            setSellingStatus(newStatus as number)
        }
    })

    return (
        <>
            <Head>
                <title>HydrInvest - Single Asset</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Actif responsable</Heading>
                <Text fontSize='xl' mt='10'>Participez au renforcement de la production d’énergie renouvelable en France aux côtés d’un opérateur de premier plan</Text>
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
                            <Heading size='md'>Caractétistiques principales</Heading>
                        </CardHeader>
                        <Divider color='#e2e8f0' />
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Nature de l&apos;actif
                                    </Heading>
                                    <Text fontSize='sm' pt='2'>
                                        Actif responsable
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Localisation de l&apos;actif
                                    </Heading>
                                    <Text fontSize='sm' pt='2'>
                                        France
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Rendement
                                    </Heading>
                                    <Text fontSize='sm' pt='2'>
                                        7% par an
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Notation ESG (MSCI)
                                    </Heading>
                                    <Text fontSize='sm' pt='2'>
                                        AAA
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
                            {sellingStatus === 0 &&
                                <Heading size='sm' color='gray.500'>La vente de tokens n&apos;a pas encore commencée pour cet actif.</Heading>
                            }
                            {sellingStatus === 2 &&
                                <Heading size='sm' color='red.500'>La vente de tokens est clôturée pour cet actif.</Heading>
                            }
                            {isAdmin && sellingStatus === 1 &&
                                <Stack mb='5'>
                                    <Alert status='warning'>
                                        <AlertIcon />
                                        Veuillez vous connecter avec un compte utilisateur, non administrateur.
                                    </Alert>
                                </Stack>
                            }
                            {!isValidated && !isAdmin && sellingStatus === 1 &&
                                <Stack mb='5'>
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertTitle fontWeight='normal'>
                                            Pour acheter des tokens, faites une demande de validation de KYC,{" "}
                                            <Link as={NextLink} href='/account/board'>ici</Link>.
                                        </AlertTitle>
                                    </Alert>
                                </Stack>
                            }
                            {sellingStatus === 1 &&
                                <Box as='form' onSubmit={buyToken}>
                                    <FormControl isInvalid={isNumberOfTokenError}>
                                        <FormLabel fontSize='sm'>Entrez le nombre de tokens que vous souhaitez acheter</FormLabel>
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
                                            <FormErrorMessage>
                                                Le nombre total de tokens est obligatoire et doit être supérieur ou égal à 1.
                                            </FormErrorMessage>
                                        ) : (
                                            <FormHelperText>
                                                Le nombre total de tokens doit être supérieur ou égal à 1.
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {isBuyingToken &&
                                        <Heading
                                            color='red'
                                            cursor='pointer'
                                            mt='5'
                                            onClick={onOpen}
                                            size='sm'
                                            textDecoration='underline'
                                        >
                                            Récupérer vos tokens sur votre Wallet
                                        </Heading>
                                    }
                                </Box>
                            }
                        </CardBody>
                    </Card>
                </SimpleGrid>
            }
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size='xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Suivez ce tutoriel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize='md' mb='5'>
                            Afin de récupérer vos tokens, vous aurez besoin de cette adresse, alors copiez la en lieu sûr : {" "}
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{id}</span>
                        </Text>
                        <Text fontSize='md' fontWeight='bold' mb='5'>
                            Ensuite, suivez les étapes décrites dans les liens ci-dessous :
                        </Text>
                        <Link
                            href='https://support.metamask.io/hc/en-us/articles/4404063526043-Adding-and-sharing-ENS-eth-address-tokens-in-MetaMask'
                            isExternal
                        >
                            Ajouter des tokens à MetaMask <ExternalLinkIcon mx='2px' />
                        </Link>
                        <Divider my='4' />
                        <Link
                            href='https://support.metamask.io/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask'
                            isExternal
                        >
                            Afficher des tokens sur MetaMask <ExternalLinkIcon mx='2px' />
                        </Link>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </>
    )
}

export default SingleAsset
