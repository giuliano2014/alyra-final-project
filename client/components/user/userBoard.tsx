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
import { useAccount, useProvider, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { financialVehicleAbi, financialVehicleContractAddress } from '@/contracts/financialVehicle'

const UserBoard = () => {
    const { address } = useAccount()
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)
    const toast = useToast()
    const { data: signer } = useSigner()

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

    // const buyToken = async (assetAddress: string, amount: number) => { // TODO: remove this function
    //     try {
    //         if (!signer) return

    //         if (!financialVehicleContractAddress) {
    //             throw new Error("contractAddress is not defined")
    //         }
    //         const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
    //         const price = await contract.getPrice(assetAddress)
    //         // const amountBigNumber = ethers.utils.parseEther((amount).toString()).mul(ethers.BigNumber.from('0.01')).toString()
    //         const amountBigNumber = ethers.utils.parseEther(amount.toString())
    //         console.log('amountBigNumber 1', amountBigNumber.toString())
    //         console.log('amountBigNumber 2', (amount / price).toString())
    //         console.log('amountBigNumber 3', (amount / price))
    //         // console.log('amountBigNumber', ethers.utils.parseEther((amountBigNumber / price).toString()).toString())
    //         // const result = await contract.buyToken(assetAddress, amountBigNumber.toString(), { value: ethers.utils.parseEther((amount / price).toString()).toString() })
    //         // console.log('amountBigNumber', ethers.utils.formatEther(amountBigNumber))
    //         // const priceBigNumber = amountBigNumber.mul(price)
    //         // console.log('priceBigNumber', ethers.utils.parseEther(priceBigNumber.toString()).toString())
    //         const result = await contract.buyToken(assetAddress, amountBigNumber.toString(), { value: (amount / price).toString() })
    //         // console.log('buyToken', result)
    //     } catch (error) {
    //         console.error("Error fetching and formatting assets:", error)
    //     }
    // }

    // const buyToken = async (assetAddress: string, amount: number) => { // TODO: remove this function
    //     try {
    //         if (!signer) return
    
    //         if (!financialVehicleContractAddress) {
    //             throw new Error("contractAddress is not defined")
    //         }
    //         const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
    //         const price = await contract.getPrice(assetAddress)
    //         const amountBigNumber = ethers.utils.parseUnits(amount.toFixed(18), 18)
    //         console.log('amountBigNumber 1', amountBigNumber.toString())
    //         const priceInEther = ethers.utils.formatEther(amountBigNumber);
    //         const bob = price
    //         console.log('bob', bob.toString())
    //         console.log('WTF', ethers.utils.parseUnits(bob.toString(), 'ether').toString())
    //         const test = (amount * price)
    //         console.log('test 1', test)
    //         console.log('test 2', ethers.utils.parseUnits(test.toFixed(18), 18).toString())
    //         console.log('transfer formatted', parseFloat(ethers.utils.formatUnits(test, 18)).toString())
    //         const value = ethers.utils.parseEther('2')
    //         console.log('value 3', value)
    //         console.log('priceInEther', priceInEther)
    //         console.log('amountBigNumber', amountBigNumber.toString())
    //         const priceBigNumber = amountBigNumber.mul(price)
    //         console.log('priceBigNumber 1', priceBigNumber)
    //         console.log('priceBigNumber 2', ethers.utils.formatEther(priceBigNumber))
    //         // const result = await contract.buyToken(assetAddress, amountBigNumber.toString(), { value: priceBigNumber.toString() })
    //         // console.log('buyToken', result)
    //     } catch (error) {
    //         console.error("Error fetching and formatting assets:", error)
    //     }
    // }

    const buyToken2 = async (assetAddress: string, amount: number) => {
        try {
            if (!signer) return
    
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const price = await contract.getPrice(assetAddress)
            const amountBigNumber = ethers.utils.parseUnits(amount.toFixed(18), 18)
            console.log('amountBigNumber', amountBigNumber.toString())
            const valueInWei = amountBigNumber.mul(price)
            console.log('valueInWei', valueInWei.toString())
            const valueInEther = ethers.utils.formatEther(valueInWei)
            console.log('valueInEther', valueInEther)
            
            const result = await contract.buyToken(assetAddress, amountBigNumber.toString(), { value: valueInWei.toString() })
            console.log('buyToken', result)
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }
    

    // const buyToken = async (assetAddress: string, amount: number) => { // TODO: remove this function
    //     try {
    //         if (!signer) return
    
    //         if (!financialVehicleContractAddress) {
    //             throw new Error("contractAddress is not defined")
    //         }
    //         const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
    //         // const price = await contract.getPrice(assetAddress)
    //         // const amountBigNumber = ethers.utils.parseUnits(amount.toString(), 'ether')
    //         console.log('WTF', ethers.utils.parseEther((amount * 0.01).toString()).toString())
    //         const value = ethers.utils.parseEther((amount * 0.01).toString()).toString()

    //         let numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18)
    //         console.log('numberOfTokens', numberOfTokens.toString())
    //         // const amountBigNumber = ethers.utils.parseUnits(amount.toString(), 'ether')
    //         const result = await contract.buyToken(assetAddress, numberOfTokens, { value: value })
    //         console.log('buyToken', result)
    //     } catch (error) {
    //         console.error("Error fetching and formatting assets:", error)
    //     }
    // }

    const buyToken = async (assetAddress: string, amount: number) => {
        try {
            if (!signer) return
    
            if (!financialVehicleContractAddress) {
                throw new Error("financialVehicleContractAddress is not defined")
            }
            console.log('assetAddress', assetAddress)
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            console.log('before buyToken', assetAddress)
            // const price = await contract.getPrice(assetAddress)
            // const amountBigNumber = ethers.utils.parseEther(amount.toString())
            // console.log('amountBigNumber', amountBigNumber.toString())
    
            // let numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18)
            // console.log('numberOfTokens', numberOfTokens.toString())
    
            // const value = ethers.utils.parseEther((amount * 0.01).toString())
            // console.log('value', value.toString())
    
            // const result = await contract.buyToken(assetAddress, numberOfTokens, { value: value })
            // const result = await contract.buyToken(assetAddress, "1000", { value: ethers.utils.parseEther("10") })
            const result = await contract.buyToken(assetAddress, ethers.utils.parseEther("10").toString(), { value: ethers.utils.parseEther("10") })
            console.log('buyToken', result)
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }

    const buyTokens = async (assetAddress: string, amount: number) => {
        try {
            if (!signer) return
    
            if (!financialVehicleContractAddress) {
                throw new Error("financialVehicleContractAddress is not defined")
            }
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const price = await contract.getPrice(assetAddress)
            const amountBigNumber = ethers.utils.parseEther(amount.toString())
            console.log('amountBigNumber', amountBigNumber.toString())
    
            let numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18)
            console.log('numberOfTokens', numberOfTokens.toString())
    
            const value = ethers.utils.parseEther((amount * 0.01).toString())
            console.log('value', value.toString())
    
            // const result = await contract.buyToken(assetAddress, numberOfTokens, { value: value })
            // const result = await contract.buyToken(assetAddress, "1000", { value: ethers.utils.parseEther("10") })
            const result = await contract.buyTokens(assetAddress,  ethers.utils.parseEther("10"), { value: ethers.utils.parseEther("10") })
            console.log('buyToken', result)
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
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
                            <Button
                                size='sm'
                                colorScheme='teal'
                                type='submit'
                                variant='solid'
                                onClick={() => buyToken('0x74fcA3bE84BBd0bAE9C973Ca2d16821FEa867fE8', 1000)}
                            >
                                Buy 1000 tokens
                            </Button>
                            <Button
                                size='sm'
                                colorScheme='teal'
                                type='submit'
                                variant='solid'
                                onClick={() => buyTokens('0x74fcA3bE84BBd0bAE9C973Ca2d16821FEa867fE8', 1000)}
                            >
                                Buy 1000 tokens
                            </Button>
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
