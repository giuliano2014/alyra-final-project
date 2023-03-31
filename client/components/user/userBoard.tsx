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
import { ethers } from 'ethers'
import { FormEvent, useEffect, useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'

import { contractAddress, abi } from '@/contracts/financialVehicle'

const UserBoard = () => {
    const { address } = useAccount()
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)
    const toast = useToast()

    useEffect(() => {
        if (!contractAddress) {
            throw new Error("contractAddress is not defined")
        }
        const contract = new ethers.Contract(contractAddress, abi, provider)
        contract.on("AskForKycValidation", async () => {
            console.log("AskForKycValidation event received:");
            getKyc()
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log('UserBoard useEffect address', address)
        getKyc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    // useEffect(() => {
    //     console.log('UserBoard useEffect provider', provider)
    //     console.log('UserBoard useEffect address', address)
    //     getKyc()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [address, provider])

    useEffect(() => {
        if (!contractAddress) {
            throw new Error("contractAddress is not defined")
        }
        const contract = new ethers.Contract(contractAddress, abi, provider)
        contract.on("KycValidated", async (userAddress, validated, status, event) => {
            // console.log("KycValidated event received:");
            // console.log("KycValidated event  User Address:", userAddress);
            // console.log("Validated:", validated);
            // console.log("Status:", status);
            // console.log("Event:", event);
            // console.log("KycValidated event address connected account => ", address)
            try {
                if (userAddress === address) {
                    const result = await contract.getKyc(address)
                    console.log('KycValidated update the kYC component')
                    setValidated(result.validated)
                    setStatus(result.status)
                } else {
                    console.log('KycValidated not update the kYC component')
                    return
                }
              } catch (error) {
                console.error("Error fetching KYC:", error)
              }
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const askForKycValidation = async (event: FormEvent) => {
        event.preventDefault()
        try {
            if (!signer) return

            if (!contractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(contractAddress, abi, signer)
            const transaction = await contract.askForKycValidation()
            const result = await transaction.wait()

            // setValidated(result.validated)
            // setStatus(result.status)

            toast({
                title: 'Bravo',
                description: 'Votre demande a bien été prise en compte',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        }
        catch (error: any) {
            console.log(error)
            toast({
                title: 'Oops :(',
                description: "Une erreur s'est produite",
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

      const getKyc = async () => {
        if (!contractAddress) {
          throw new Error("contractAddress is not defined")
        }
      
        const contract = new ethers.Contract(contractAddress, abi, provider)
      
        try {
          const result = await contract.getKyc(address)
          setValidated(result.validated)
          setStatus(result.status)
        } catch (error) {
          console.error("Error fetching KYC:", error)
        }
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
