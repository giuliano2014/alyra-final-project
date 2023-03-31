import {
    Badge,
    Box,
    Button,
    Card,
    Heading,
    Stack,
    Tab,
    Table,
    TableCaption,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const UserBoard = () => {
    const { address } = useAccount()
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)
    const toast = useToast()

    useEffect(() => {
        getKycValidationByAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfwkwcvk59xf01up8vej50qw/master', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODAyNzczNTgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xmd2t3Y3ZrNTl4ZjAxdXA4dmVqNTBxdy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTY2M2Q0N2ItNzg1NC00M2Y4LTk2NzUtMzRiM2NlYTc0ZjAzIiwianRpIjoiY2xmd3ByNzRxNW9maTAxdWlmcmRyZmd1biJ9.yrBtKTSc7UP3uZ1edrsLEQjKB0aErkv1CPwZKG2PEWXj6rb9uYUzLvblj1XeT6iA45kl_usH08sq9Qj7XHRcoQouQF_gAW8KFI4Z6EyW0h0t2Q7DEVeZ2NQhMyM-oz4LHk7q7AT1OyKG4EYX43O0xRrN5DraK2BFpGsdFo2WVoqiXvmvU0XAN_jJkFlaXZCMz2aH8a1OgZOWfAn4e9Q_d4GNsEZPtlGko3epeUlm0g0Eml9UR-03aIbVGQS9FQeWhlYeaums6jnkiCZ0XOd4MWKyqaAFSoai8Fn-QEMWxwxBaLN768GSR1JPgYw_3cql8Q48q6dK5qbkMT4lHL3iT37G28EHxbSJWGlvnKEvHfVyBIELSWZ02BfG-3x_kGz1gQqWVUMkFRoV1R7zStTdp-Y-l2EpSsRjp7f6CHWYEPYk9zctgo86CTAFNHTmpA0xznMtAMRwiIKrUSAhwPljYidkW-ZrzvIMspy9ptN1HjmZvPxo6-DgsGHHgWKMBFe4y8UjwG1ToylkP6L_kDCYLKa27eOvmX80O27BtslJWZszzyJl24V2MHMJ9qY-Lm-4Kns7ZKVDXZrJ7hYzeXG-ICYrP7U6WH5PaY9qImAo95lX-z6zDXtmSQ30Z4qBxvBLUnDU89dL4ZmhoAtbJNhVA6PPvWBx_d76uBH8e871HpE',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables
                })
            })
        
            const json = await res.json()
            setValidated(json.data.createKycValidation.isValidated)
            setStatus(json.data.createKycValidation.validationStatus)
            toast({
                title: 'Bravo',
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
            "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfwkwcvk59xf01up8vej50qw/master",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODAyNzczNTgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xmd2t3Y3ZrNTl4ZjAxdXA4dmVqNTBxdy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTY2M2Q0N2ItNzg1NC00M2Y4LTk2NzUtMzRiM2NlYTc0ZjAzIiwianRpIjoiY2xmd3ByNzRxNW9maTAxdWlmcmRyZmd1biJ9.yrBtKTSc7UP3uZ1edrsLEQjKB0aErkv1CPwZKG2PEWXj6rb9uYUzLvblj1XeT6iA45kl_usH08sq9Qj7XHRcoQouQF_gAW8KFI4Z6EyW0h0t2Q7DEVeZ2NQhMyM-oz4LHk7q7AT1OyKG4EYX43O0xRrN5DraK2BFpGsdFo2WVoqiXvmvU0XAN_jJkFlaXZCMz2aH8a1OgZOWfAn4e9Q_d4GNsEZPtlGko3epeUlm0g0Eml9UR-03aIbVGQS9FQeWhlYeaums6jnkiCZ0XOd4MWKyqaAFSoai8Fn-QEMWxwxBaLN768GSR1JPgYw_3cql8Q48q6dK5qbkMT4lHL3iT37G28EHxbSJWGlvnKEvHfVyBIELSWZ02BfG-3x_kGz1gQqWVUMkFRoV1R7zStTdp-Y-l2EpSsRjp7f6CHWYEPYk9zctgo86CTAFNHTmpA0xznMtAMRwiIKrUSAhwPljYidkW-ZrzvIMspy9ptN1HjmZvPxo6-DgsGHHgWKMBFe4y8UjwG1ToylkP6L_kDCYLKa27eOvmX80O27BtslJWZszzyJl24V2MHMJ9qY-Lm-4Kns7ZKVDXZrJ7hYzeXG-ICYrP7U6WH5PaY9qImAo95lX-z6zDXtmSQ30Z4qBxvBLUnDU89dL4ZmhoAtbJNhVA6PPvWBx_d76uBH8e871HpE',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        userAddress: address,
                    },
                }),
            }
        )
    
        const data = await res.json()
        setValidated(data?.data?.kycValidations[0]?.isValidated)
        setStatus(data?.data?.kycValidations[0]?.validationStatus)
    }

    return (
        <>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Tableau de bord</Heading>
            </Box>
            <Tabs colorScheme='purple' isLazy  mt='20' variant='soft-rounded'>
                <TabList>
                    <Tab>Gestion de mes actifs</Tab>
                    <Tab>Gestion de mon KYC</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>Mes actifs</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>Mes actifs</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Titre</Th>
                                                <Th>Nb de token</Th>
                                                <Th>Symbol du token</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
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
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>Mon KYC</Heading>
                        </Box>
                        <Card borderRadius='2xl' mt='4' padding='4'>
                            <Box
                                alignItems='center'
                                as='form'
                                display='flex'
                                justifyContent='space-between'
                                onSubmit={askForKycValidation}
                            >
                                <Heading size='sm'>Demande de validation de mon KYC</Heading>
                                <Stack direction='row' spacing={4}>
                                    {status !== "in progress" && status !== "done" &&
                                        <Button
                                            size='sm'
                                            colorScheme='teal'
                                            type='submit'
                                            variant='solid'
                                        >
                                            Validation
                                        </Button>
                                    }
                                    {!validated && status === "in progress" &&
                                        <Button
                                            size='sm'
                                            colorScheme='teal'
                                            isLoading={true}
                                            loadingText='Demande en cours de traitement'
                                            type='submit'
                                            variant='solid'
                                        >
                                            Validation
                                        </Button>
                                    }
                                    {validated && status === "done" && <Badge colorScheme="green">Validé</Badge>}
                                    {!validated && status === "done" && <Badge colorScheme="red">Votre KYC a été refusé</Badge>}
                                </Stack>
                            </Box>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default UserBoard
