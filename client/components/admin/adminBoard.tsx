import {
    Badge,
    Box,
    Button,
    Card,
    effect,
    Heading,
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
import { useProvider, useSigner } from 'wagmi'

import AddNewAsset from '@/components/admin/addNewAsset'
import Fund from '@/components/admin/fund'
import Kyc from '@/components/admin/kyc'
import { financialVehicleAbi, financialVehicleContractAddress } from '@/contracts/financialVehicle'

type Asset = {
    assetAddress: string
    name: string
    symbol: string
    totalSupply: ethers.BigNumber
}

type FormattedAsset = {
    assetAddress: string
    name: string
    symbol: string
    totalSupply: string
}

const AdminBoard = () => {
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [assetName, setAssetName] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [assetSymbol, setAssetTokenSymbol] = useState('')
    const [assets, setAssets] = useState<FormattedAsset[]>([])
    const [financialVehicleBalance, setFinancialVehicleBalance] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [kycValidations, setKycValidations] = useState<any[]>([])
    const toast = useToast()

    useEffect(() => {
        getAssets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getKycValidations()
    }, [isLoading])

    useEffect(() => {
        if (!financialVehicleContractAddress) {
            throw new Error("contractAddress is not defined")
        }

        const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)

        contract.on("WithdrawFromFinancialVehicle", async () => {
            getBalanceOfFinancialVehicle()
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createAsset = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const assetTotalSupplyBigNumber = ethers.utils.parseUnits(assetTotalSupply.toString(), 'ether')
            const transaction = await contract.createAsset(assetName, assetSymbol, assetTotalSupplyBigNumber)
            await transaction.wait()
            toast({
                title: 'Congratulations',
                description: 'A new actif has been created !',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        }
        catch (error: any) {
            console.error(error)
            toast({
                title: 'Error',
                description: `An error occurred`,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const fetchAndFormatAssets = async () => {
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
            const result = await contract.getAssets()
            const formattedResult = result.map(({ assetAddress, name, symbol, totalSupply }: Asset) => ({
                assetAddress,
                name,
                symbol,
                totalSupply: parseFloat(ethers.utils.formatUnits(totalSupply, 18)).toString()
            }))
            const reversedResult = [...formattedResult].reverse()
            return reversedResult
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }
    
    const getAssets = async () => {
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
    
            contract.on("AssetCreated", async () => {
                const reversedResult = await fetchAndFormatAssets()
                if (reversedResult) {
                    setAssets(reversedResult)
                    scrollToTop()
                } else {
                    console.error("Error fetching and formatting assets.")
                }
            })
    
            const reversedResult = await fetchAndFormatAssets()
            if (reversedResult) {
                setAssets(reversedResult)
            } else {
                console.error("Error fetching and formatting assets.")
            }
        } catch (error) {
            console.error("Error getting assets:", error)
        }
    }

    const getBalance = async (assetAddress: string, accountAddress: string) => { // TODO: remove this function
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
            const result = await contract.getBalance(assetAddress, accountAddress)
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }

    const getBalanceOfFinancialVehicle = async () => {
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
            const result = await contract.getBalanceOfFinancialVehicle()
            setFinancialVehicleBalance(parseFloat(ethers.utils.formatUnits(result, 18)).toString())
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }

    const getKycValidations = async () => {
        const query = `
            query KycValidations {
                kycValidations {
                    id
                    isValidated
                    userAddress
                    validationStatus
                }
            }
        `

        const res = await fetch(
            process.env.NEXT_PUBLIC_HYGRAPH_API_URL || '',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
                },
                body: JSON.stringify({ query })
            }
        )

        const data = await res.json()
        setKycValidations(data.data.kycValidations)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const validateKyc = async (id: string, isValidated: boolean) => {
        setIsLoading(true)

        const mutation = `
            mutation UpdateKycValidation($isValidated: Boolean!, $validationStatus: String!, $id: ID!) {
                updateKycValidation(
                    where: { id: $id }
                    data: {
                        isValidated: $isValidated,
                        validationStatus: $validationStatus
                    }
                ) {
                    id
                }
            }
        `
        
        const variables = {
            isValidated: isValidated,
            validationStatus: "done",
            id: id
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
        
            await res.json()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const withdraw = async (assetAddress: string, accountAddress: string, amount: number) => { // TODO: move this function in the right component
        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const amountBigNumber = ethers.utils.parseEther(amount.toString()).toString()

            // const approval = await contract.approve(assetAddress, amountBigNumber)
            // await approval.wait()

            await contract.withdraw(assetAddress, accountAddress, amountBigNumber)
        } catch (error) {
            console.error("Error fetching and formatting assets:", error)
        }
    }

    const withdrawFromFinancialVehicle = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const amountBigNumber = ethers.utils.parseEther(withdrawAmount.toString()).toString()
            await contract.withdrawFromFinancialVehicle(amountBigNumber, recipientAddress)
            // const result = await contract.withdrawFromFinancialVehicle(amountBigNumber, recipientAddress)
            // await result.wait()
            toast({
                title: 'Super !',
                description: 'Votre retrait est en cours de traitement.',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.error("An error occured on withdraw from financial vehicle", error)
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
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Tableau de bord</Heading>
            </Box>
            <Tabs colorScheme='purple' isLazy  mt='20' variant='soft-rounded'>
                <TabList>
                    <Tab>Gestion des actifs</Tab>
                    <Tab>Gestion des KYC</Tab>
                    <Tab>Gestion des fonds</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>Métriques des actifs</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>
                                            {assets.length > 0 ? "Métriques des actifs" : "Aucun actif n'a été créé pour le moment"}
                                        </TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Adresse</Th>
                                                <Th>Nom</Th>
                                                <Th>Nb total de token</Th>
                                                <Th>Symbol du token</Th>
                                                <Th>Nb token vendu</Th>
                                                <Th>Nb token restant</Th>
                                                <Th>Statut</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {assets.length > 0 && assets.map(({ assetAddress, name, symbol, totalSupply }) => {
                                                return (
                                                    <Tr key={assetAddress}>
                                                        <Td>{assetAddress}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>{totalSupply}</Td>
                                                        <Td>{symbol}</Td>
                                                        <Td>0</Td>
                                                        <Td>{totalSupply}</Td>
                                                        <Td>
                                                            <Badge>Vente non commencée</Badge>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                            {/* <Tr>
                                                <Td>Actif #1</Td>
                                                <Td>200.000</Td>
                                                <Td>AFT</Td>
                                                <Td>130.000</Td>
                                                <Td>70.000</Td>
                                                <Td>
                                                    <Badge colorScheme="orange">Vente en cours</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #2</Td>
                                                <Td>1.000.000</Td>
                                                <Td>AST</Td>
                                                <Td>350.000</Td>
                                                <Td>650.000</Td>
                                                <Td>
                                                    <Badge colorScheme="orange">Deuxième tour</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #3</Td>
                                                <Td>50.000</Td>
                                                <Td>ATT</Td>
                                                <Td>50.000</Td>
                                                <Td>0</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Vente clôturée</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #4</Td>
                                                <Td>500.000</Td>
                                                <Td>AQT</Td>
                                                <Td>0</Td>
                                                <Td>500.000</Td>
                                                <Td>
                                                    <Badge>Vente non commencée</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Actif #5</Td>
                                                <Td>2.000.000</Td>
                                                <Td>ACT</Td>
                                                <Td>1.300.000</Td>
                                                <Td>700.000</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Vente annulée</Badge>
                                                </Td>
                                            </Tr> */}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                        <Box mt='10'>
                            <Heading size='md'>Actions sur les actifs</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>{assets.length > 0 ? "Actions sur les actifs " : "Aucun actif n'a été créé pour le moment"}</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Address</Th>
                                                <Th>Nom</Th>
                                                <Th>Phase 1</Th>
                                                <Th>Phase 2</Th>
                                                <Th>Annulation</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {assets.length > 0 && assets.map(({ assetAddress, name }) => {
                                                return (
                                                    <Tr key={assetAddress}>
                                                        <Td>{assetAddress}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>
                                                            <Button
                                                                colorScheme='teal'
                                                                size='xs'
                                                                onClick={() => getBalance(assetAddress, financialVehicleContractAddress || '')}
                                                            >
                                                                getBalance
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button
                                                                colorScheme='red'
                                                                size='xs'
                                                                onClick={() => withdraw(assetAddress, '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 190)}
                                                            >
                                                                withdraw 
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button colorScheme='red' isDisabled size='xs'>
                                                                Annuler
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                            {assets.length > 0 && assets.map(({ assetAddress, name }) => {
                                                return (
                                                    <Tr key={assetAddress}>
                                                        <Td>{assetAddress}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>
                                                            <Button colorScheme='teal' size='xs'>
                                                                Commencer
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button colorScheme='teal' isDisabled size='xs'>
                                                                Commencer
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button colorScheme='red' isDisabled size='xs'>
                                                                Annuler
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                            {/* <Tr>
                                                <Td>Asset #1</Td>
                                                <Td>
                                                    <Button
                                                        colorScheme='teal'
                                                        isLoading
                                                        loadingText='En cours'
                                                        size='xs'
                                                        spinnerPlacement='start'
                                                        variant='outline'
                                                    >
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' size='xs'>
                                                        Annuler
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #2</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button
                                                        colorScheme='teal'
                                                        isLoading
                                                        loadingText='En cours'
                                                        size='xs'
                                                        spinnerPlacement='start'
                                                        variant='outline'
                                                    >
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' size='xs'>
                                                        Annuler
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #3</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Annuler
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #4</Td>
                                                <Td>
                                                    <Button colorScheme='teal' size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Annuler
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #5</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Commencer
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Annuler
                                                    </Button>
                                                </Td>
                                            </Tr> */}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                        <AddNewAsset
                            assetName={assetName}
                            assetSymbol={assetSymbol}
                            assetTotalSupply={assetTotalSupply}
                            createAsset={createAsset}
                            setAssetName={setAssetName}
                            setAssetSymbol ={setAssetTokenSymbol}
                            setAssetTotalSupply={setAssetTotalSupply}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Kyc
                            kycValidations={kycValidations}
                            validateKyc={validateKyc}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Fund   
                            financialVehicleBalance={financialVehicleBalance}
                            getBalanceOfFinancialVehicle={getBalanceOfFinancialVehicle}
                            recipientAddress={recipientAddress}
                            setRecipientAddress={setRecipientAddress}
                            setWithdrawAmount={setWithdrawAmount}
                            withdrawAmount={withdrawAmount}
                            withdrawFromFinancialVehicle={withdrawFromFinancialVehicle}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default AdminBoard
