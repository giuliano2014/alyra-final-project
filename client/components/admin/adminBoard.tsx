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
import { useProvider, useSigner } from 'wagmi'

import AddNewAsset from '@/components/admin/addNewAsset'
import Kyc from '@/components/admin/kyc'
import { abi, contractAddress } from '@/contracts/financialVehicle'

type Asset = {
    tokenAddress: string
    name: string
    symbol: string
    totalSupply: ethers.BigNumber
}

type FormattedAsset = {
    name: string
    symbol: string
    totalSupply: string
}

const AdminBoard = () => {
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [assetName, setAssetName] = useState('')
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [assetSymbol, setAssetTokenSymbol] = useState('')
    const [assets, setAssets] = useState<FormattedAsset[]>([])
    const [kycValidations, setKycValidations] = useState<any[]>([])
    const toast = useToast()

    useEffect(() => {
        getAssets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createAsset = async (event: FormEvent) => {
        event.preventDefault()

        try {
            if (!signer) return

            if (!contractAddress) {
                throw new Error("contractAddress is not defined")
            }

            const contract = new ethers.Contract(contractAddress, abi, signer)
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
            if (!contractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(contractAddress, abi, provider)
            const result = await contract.getAssets()
            const formattedResult: FormattedAsset[] = result.map(({ name, symbol, totalSupply }: Asset) => ({
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
            if (!contractAddress) {
                throw new Error("contractAddress is not defined")
            }
    
            const contract = new ethers.Contract(contractAddress, abi, provider)
    
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
      
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        getKycValidations()
    }, [])

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
            'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfwkwcvk59xf01up8vej50qw/master',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODAyNzczNTgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xmd2t3Y3ZrNTl4ZjAxdXA4dmVqNTBxdy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTY2M2Q0N2ItNzg1NC00M2Y4LTk2NzUtMzRiM2NlYTc0ZjAzIiwianRpIjoiY2xmd3ByNzRxNW9maTAxdWlmcmRyZmd1biJ9.yrBtKTSc7UP3uZ1edrsLEQjKB0aErkv1CPwZKG2PEWXj6rb9uYUzLvblj1XeT6iA45kl_usH08sq9Qj7XHRcoQouQF_gAW8KFI4Z6EyW0h0t2Q7DEVeZ2NQhMyM-oz4LHk7q7AT1OyKG4EYX43O0xRrN5DraK2BFpGsdFo2WVoqiXvmvU0XAN_jJkFlaXZCMz2aH8a1OgZOWfAn4e9Q_d4GNsEZPtlGko3epeUlm0g0Eml9UR-03aIbVGQS9FQeWhlYeaums6jnkiCZ0XOd4MWKyqaAFSoai8Fn-QEMWxwxBaLN768GSR1JPgYw_3cql8Q48q6dK5qbkMT4lHL3iT37G28EHxbSJWGlvnKEvHfVyBIELSWZ02BfG-3x_kGz1gQqWVUMkFRoV1R7zStTdp-Y-l2EpSsRjp7f6CHWYEPYk9zctgo86CTAFNHTmpA0xznMtAMRwiIKrUSAhwPljYidkW-ZrzvIMspy9ptN1HjmZvPxo6-DgsGHHgWKMBFe4y8UjwG1ToylkP6L_kDCYLKa27eOvmX80O27BtslJWZszzyJl24V2MHMJ9qY-Lm-4Kns7ZKVDXZrJ7hYzeXG-ICYrP7U6WH5PaY9qImAo95lX-z6zDXtmSQ30Z4qBxvBLUnDU89dL4ZmhoAtbJNhVA6PPvWBx_d76uBH8e871HpE',
                },
                body: JSON.stringify({ query })
            }
        )

        const data = await res.json()
        setKycValidations(data.data.kycValidations)
    }

    const validateKyc = async (id: string, isValidated: boolean) => {
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
        
            await res.json()
        } catch (error) {
            console.error(error)
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
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>Métriques des actifs</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped' minH={assets.length > 0 ? 'auto' : '150'}>
                                        <TableCaption>
                                            {assets.length > 0 ? "Métriques des actifs" : "Aucun actif n'a été créé pour le moment"}
                                        </TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Nom</Th>
                                                <Th>Nb total de token</Th>
                                                <Th>Symbol du token</Th>
                                                <Th>Nb token vendu</Th>
                                                <Th>Nb token restant</Th>
                                                <Th>Statut</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {assets.length > 0 && assets.map(({ name, symbol, totalSupply }, index) => {
                                                return (
                                                    <Tr key={`${index}${name}${symbol}`}>
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
                                    <Table variant='striped' minH={assets.length > 0 ? 'auto' : '150'}>
                                        <TableCaption>{assets.length > 0 ? "Actions sur les actifs " : "Aucun actif n'a été créé pour le moment"}</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Titre</Th>
                                                <Th>Phase 1</Th>
                                                <Th>Phase 2</Th>
                                                <Th>Annulation</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {assets.length > 0 && assets.map(({ name }, index) => {
                                                return (
                                                    <Tr key={`${index}${name}`}>
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
                </TabPanels>
            </Tabs>
        </>
    )
}

export default AdminBoard
