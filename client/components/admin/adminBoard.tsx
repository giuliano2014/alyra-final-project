import {
    Badge,
    Box,
    Button,
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
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { FormEvent, useEffect, useState } from 'react'
import { useContractEvent, useProvider, useSigner } from 'wagmi'

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
    const [assets, setAssets] = useState<FormattedAsset[]>([])
    const [assetName, setAssetName] = useState('')
    const [assetSymbol, setAssetTokenSymbol] = useState('')
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [financialVehicleBalance, setFinancialVehicleBalance] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingEndSellingSessions, setIsLoadingEndSellingSessions] = useState<{ [key: string]: boolean }>({});
    const [isLoadingStartSellingSessions, setIsLoadingStartSellingSessions] = useState<{ [key: string]: boolean }>({});
    const [kycValidations, setKycValidations] = useState<any[]>([])
    const [recipientAddress, setRecipientAddress] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState(0)
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
                title: 'Bravo :)',
                description: 'Votre nouvel actif a été créé',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        }
        catch (error: any) {
            console.error(error)
            toast({
                title: 'Oops :(',
                description: `Une erreur s'est produite`,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const endSellingSession = async (assetAddress: string) => {
        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            await contract.endSellingSession(assetAddress)
            setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress]: true }));
        } catch (error) {
            console.error("An error occurred on endSellingSession :", error)
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
            console.error("An error occurred on fetchAndFormatAssets :", error)
        }
    }

    const fetchPastSellingStatusChangeEvents = async () => {
        try {
            if (!signer) return
        
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
        
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const filter = contract.filters.SellingStatusChange()
            const events = await contract.queryFilter(filter)

            if (events.length === 0) return
        
            events.forEach(event => {
                const { assetAddress, newStatus } = event.args as any;

                if (newStatus === 0) {
                    setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }))
                    setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }))
                }
                if (newStatus === 1) {
                    setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }))
                    setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }))
                }
                if (newStatus === 2) {
                    setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }))
                    setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }))
                }
            })
    
        } catch (error) {
            console.error("An error occurred on fetchPastSellingStatusChangeEvents :", error)
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
            console.error("An error occured on getAssets :", error)
        }
    }

    // @TODO : remove this function if not used
    const getBalance = async (assetAddress: string, accountAddress: string) => {
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
            const result = await contract.getBalance(assetAddress, accountAddress)
            console.log("getBalance", parseFloat(ethers.utils.formatUnits(result, 18)).toString())
        } catch (error) {
            console.error("An error occured on getBalance :", error)
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
            console.error("An error occured on getBalanceOfFinancialVehicle :", error)
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

    const startSellingSession = async (assetAddress: string) => {
        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            await contract.startSellingSession(assetAddress)
            setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress]: true }));
        } catch (error) {
            console.error("An error occured on startSellingSession :", error)
        }
    }

    useEffect(() => {
        fetchPastSellingStatusChangeEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startSellingSession])

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

    // @TODO: remove this function if not used
    const withdraw = async (assetAddress: string, accountAddress: string, amount: number) => {
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
            console.error("An error occured on withdraw from financial vehicle :", error)
            toast({
                title: 'Oups !',
                description: "Une erreur s'est produite :(",
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    // @TODO: remove this function if not used
    // useContractEvent({
    //     address: financialVehicleContractAddress as any,
    //     abi: financialVehicleAbi,
    //     eventName: 'SellingStatusChange',
    //     listener(assetAddress, newStatus) {
    //         if (newStatus === 0) {
    //             setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }));
    //             setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }));
    //         }
    //         if (newStatus === 1) {
    //             setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }));
    //             setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: false }));
    //         }
    //         if (newStatus === 2) {
    //             setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }));
    //             setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress as string]: true }));
    //         }
    //     }
    // })

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
                                                <Th>Statut</Th>
                                                <Th>Nb total de token</Th>
                                                <Th>Symbol du token</Th>
                                                <Th>Nb token vendu</Th>
                                                <Th>Nb token restant</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {assets.length > 0 && assets.map(({ assetAddress, name, symbol, totalSupply }) => {
                                                return (
                                                    <Tr key={assetAddress}>
                                                        <Td>{assetAddress}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>
                                                            {!isLoadingStartSellingSessions[assetAddress] && !isLoadingEndSellingSessions[assetAddress] && (
                                                                <Badge>Vente non commencée</Badge>
                                                            )}
                                                            {isLoadingStartSellingSessions[assetAddress] && !isLoadingEndSellingSessions[assetAddress] && (
                                                                <Badge colorScheme="green">Vente en cours</Badge>
                                                            )}
                                                            {isLoadingStartSellingSessions[assetAddress] && isLoadingEndSellingSessions[assetAddress] && (
                                                                <Badge colorScheme="red">Vente clôturée</Badge>
                                                            )}
                                                        </Td>
                                                        <Td>{totalSupply}</Td>
                                                        <Td>{symbol}</Td>
                                                        <Td>0</Td>
                                                        <Td>{totalSupply}</Td>
                                                    </Tr>
                                                )
                                            })}
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
                                                <Th>Démarrer la vente</Th>
                                                <Th>Clôturer la vente</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {/* {assets.length > 0 && assets.map(({ assetAddress, name }) => {
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
                                                    </Tr>
                                                )
                                            })} */}
                                            {assets.length > 0 && assets.map(({ assetAddress, name }, index) => {
                                                return (
                                                    <Tr key={assetAddress}>
                                                        <Td>{assetAddress}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>
                                                            <Button
                                                                colorScheme='teal'
                                                                isDisabled={isLoadingStartSellingSessions[assetAddress]}
                                                                onClick={() => startSellingSession(assetAddress)}
                                                                size='xs'
                                                            >
                                                                Commencer
                                                            </Button>
                                                        </Td>
                                                        <Td>
                                                            <Button
                                                                colorScheme='red'
                                                                isDisabled={isLoadingEndSellingSessions[assetAddress]}
                                                                onClick={() => endSellingSession(assetAddress)}
                                                                size='xs'
                                                            >
                                                                Terminer
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
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
