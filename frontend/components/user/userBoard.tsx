import {
    Box,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import Asset from '@/components/user/asset'
import Kyc from '@/components/user/kyc'

const UserBoard = () => {
    const { address } = useAccount()
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)
    const toast = useToast()

    useEffect(() => {
        let unsubscribe: any;

        const fetchValidationAndSubscribe = async () => {
            unsubscribe = await getKycValidationByAddress();
        };

        fetchValidationAndSubscribe();

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);


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
                        <Asset />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default UserBoard
