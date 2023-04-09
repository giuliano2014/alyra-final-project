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
import { ethers } from 'ethers'
import { FormEvent, useEffect, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'

import { FormattedAsset } from "@/components/admin/adminBoard.types"
import AddNewAsset from '@/components/admin/addNewAsset'
import AssetActions from '@/components/admin/assetActions'
import AssetMetrics from '@/components/admin/assetMetrics'
import Fund from '@/components/admin/fund'
import Kyc from '@/components/admin/kyc'
import { financialVehicleAbi, financialVehicleContractAddress } from '@/contracts/financialVehicle'

type Asset = {
    assetAddress: string
    name: string
    symbol: string
    totalSupply: ethers.BigNumber
}

const AdminBoard = () => {
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [assetName, setAssetName] = useState('')
    const [assetSymbol, setAssetTokenSymbol] = useState('')
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [assets, setAssets] = useState<FormattedAsset[]>([])
    const [financialVehicleBalance, setFinancialVehicleBalance] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingEndSellingSessions, setIsLoadingEndSellingSessions] = useState<{ [key: string]: boolean }>({})
    const [isLoadingStartSellingSessions, setIsLoadingStartSellingSessions] = useState<{ [key: string]: boolean }>({})
    const [kycValidations, setKycValidations] = useState<any[]>([])
    const [recipientAddress, setRecipientAddress] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const toast = useToast()

    useEffect(() => {
        let unsubscribe: any

        const fetchAssetsAndSubscribe = async () => {
            unsubscribe = await getAssets()
        }

        fetchAssetsAndSubscribe()

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let unsubscribe: any

        const fetchKycValidationsAndSubscribe = async () => {
            unsubscribe = await getKycValidations()
        }

        fetchKycValidationsAndSubscribe()

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [isLoading])

    useEffect(() => {
        if (!financialVehicleContractAddress) {
            throw new Error("contractAddress is not defined")
        }

        const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)

        // Create an event listener function
        const onWithdrawFromFinancialVehicle = async () => {
            getBalanceOfFinancialVehicle()
        }

        // Attach the event listener
        contract.on("WithdrawFromFinancialVehicle", onWithdrawFromFinancialVehicle)

        // Return a cleanup function to remove the event listener when the component unmounts
        return () => {
            contract.off("WithdrawFromFinancialVehicle", onWithdrawFromFinancialVehicle)
        }

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
            const transaction = await contract.endSellingSession(assetAddress)
            await transaction.wait()

            setIsLoadingEndSellingSessions(prevState => ({ ...prevState, [assetAddress]: true }))
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
                const { assetAddress, newStatus } = event.args as any

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
            console.error("An error occurred on getAssets :", error)
        }
    }

    const getBalance = async (assetAddress: string, accountAddress: string) => {
        try {
            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, provider)
            const result = await contract.getBalance(assetAddress, accountAddress)
            const formattedResult = parseFloat(ethers.utils.formatUnits(result, 18)).toString()
            const currentAsset = assets.find(asset => asset.assetAddress === assetAddress)
            const numberOfTokensold = parseFloat(currentAsset?.totalSupply as string) - parseFloat(formattedResult)

            toast({
                title: `Vous avez vendu ${numberOfTokensold} ${currentAsset?.symbol} token(s)`,
                description: `La balance restante, est de ${formattedResult} ${currentAsset?.symbol} token(s)`,
                duration: 12000,
                isClosable: true
            })
        } catch (error) {
            console.error("An error occurred on getBalance :", error)
            toast({
                title: 'Oups :(',
                description: "Une erreur s'est produite",
                status: 'error',
                duration: 5000,
                isClosable: true
            })
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
            console.error("An error occurred on getBalanceOfFinancialVehicle :", error)
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

    const startSellingSession = async (assetAddress: string) => {
        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const transaction = await contract.startSellingSession(assetAddress)
            await transaction.wait()

            setIsLoadingStartSellingSessions(prevState => ({ ...prevState, [assetAddress]: true }))
        } catch (error) {
            console.error("An error occurred on startSellingSession :", error)
        }
    }

    useEffect(() => {
        let unsubscribe: any

        const fetchEventsAndSubscribe = async () => {
            unsubscribe = await fetchPastSellingStatusChangeEvents()
        }

        fetchEventsAndSubscribe()

        // Cleanup function to unsubscribe when component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }

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

    const withdrawFromFinancialVehicle = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return

            if (!financialVehicleContractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(financialVehicleContractAddress, financialVehicleAbi, signer)
            const amountBigNumber = ethers.utils.parseEther(withdrawAmount.toString()).toString()
            const transaction = await contract.withdrawFromFinancialVehicle(amountBigNumber, recipientAddress)
            await transaction.wait()

            toast({
                title: 'Bravo :)',
                description: 'Votre retrait est en cours de traitement',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.error("An error occurred on withdrawFromFinancialVehicle :", error)
            toast({
                title: 'Oups :(',
                description: "Une erreur s'est produite",
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
                        <AssetMetrics
                            assets={assets}
                            isLoadingEndSellingSessions={isLoadingEndSellingSessions}
                            isLoadingStartSellingSessions={isLoadingStartSellingSessions}
                        />
                        <AssetActions
                            assets={assets}
                            endSellingSession={endSellingSession}
                            getBalance={getBalance}
                            isLoadingEndSellingSessions={isLoadingEndSellingSessions}
                            isLoadingStartSellingSessions={isLoadingStartSellingSessions}
                            startSellingSession={startSellingSession}
                        />
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
