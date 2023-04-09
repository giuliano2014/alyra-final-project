import {
    Box,
    Card,
    Heading,
    Tab,
    Table,
    TableCaption,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import Kyc from '@/components/user/kyc'

const UserBoard = () => {
    const { address } = useAccount()
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)
    const toast = useToast()

    useEffect(() => {
        getKycValidationByAddress()
    }, [address])

    const askForKycValidation = async (e: any) => {
        e.preventDefault()
        
        const mutation = `
            mutation CreateKycValidation($userAddress: String!, $isValidated: Boolean!, $validationStatus: String!) {
                createKycValidation(data: {
                    userAddress: $userAddress,
                    isValidated: $isValidated,
                    validationStatus: $validationStatus
                }) {
                        userAddress
                        isValidated
                        validationStatus
                    }
            }`
        
        const variables = {
            userAddress: address,
            isValidated: false,
            validationStatus: "in progress"
        }
        
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_HYGRAPH_API_URL || '',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
                    },
                    body: JSON.stringify({
                        query: mutation,
                        variables
                    })
                }
            )
        
            const json = await res.json()
            setValidated(json.data.createKycValidation.isValidated)
            setStatus(json.data.createKycValidation.validationStatus)
            toast({
                title: 'Bravo :)',
                description: 'Votre demande a bien été prise en compte',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.error(error)
            toast({
                title: 'Oops :(',
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
        setValidated(data?.data?.kycValidations[0]?.isValidated)
        setStatus(data?.data?.kycValidations[0]?.validationStatus)
    }

    return (
        <>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Portefeuille</Heading>
            </Box>
            <Tabs colorScheme='purple' isLazy  mt='20' variant='soft-rounded'>
                <TabList>
                    <Tab>Gestion de mon KYC</Tab>
                    <Tab>Gestion de mes actifs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Kyc
                            askForKycValidation={askForKycValidation}
                            status={status}
                            validated={validated}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>Mes actifs</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>Vos n&apos;avez pas encore acheté d&apos;actif</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Titre</Th>
                                                <Th>Nb de token</Th>
                                                <Th>Symbol du token</Th>
                                            </Tr>
                                        </Thead>
                                        {/* <Tbody>
                                            <Tr>
                                                <Td>Actif #3</Td>
                                                <Td>1.500</Td>
                                                <Td>ATT</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #11</Td>
                                                <Td>500</Td>
                                                <Td>AET</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #5</Td>
                                                <Td>50.000</Td>
                                                <Td>AFT</Td>
                                            </Tr>
                                        </Tbody> */}
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default UserBoard
