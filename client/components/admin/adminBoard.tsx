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
    Switch,
    useToast
} from '@chakra-ui/react'
import { ChangeEventHandler, useEffect, useState } from 'react'

import AddNewAsset from '@/components/admin/addNewAsset'
import { useProvider, useSigner } from 'wagmi'
import { ethers } from 'ethers'

import { abi, contractAddress } from '@/contracts/financialVehicle'

type Asset = {
    tokenAddress: string;
    name: string;
    symbol: string;
    initialSupply: number;
}

const AdminBoard = () => {
    const provider = useProvider()
    const { data: signer } = useSigner()
    const [assetName, setAssetName] = useState('')
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [assetSymbol, setAssetTokenSymbol] = useState('')
    const [assets, setAssets] = useState<Asset[]>([])
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({
        0: false,
        1: true,
        2: false,
        3: true,
        4: true,
        5: false
    })
    const toast = useToast()

    useEffect(() => {
        getAssets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createAsset = async (event: any) => {
        event.preventDefault()

        if (!signer) return

        try {
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
            console.log(error)
            toast({
                title: 'Error',
                description: `An error occurred. ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const getAssets = async () => {
        const contract = new ethers.Contract(contractAddress, abi, provider)

        contract.on("AssetCreated", async () => {
            const result = await contract.getAssets()
            const reversedResult = [...result].reverse()
            setAssets(reversedResult)
            scrollToTop()
        })
    }

    const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        setSwitchStates({
            ...switchStates,
            [event.target.name]: event.target.checked
        })
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
                                    <Table variant='striped' minH={assets.length > 0 ? '0' : '150'}>
                                        <TableCaption>{assets.length > 0 ? "Métriques des actifs" : "Aucun actif n'a été créé pour le moment"}</TableCaption>
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
                                            {assets.length > 0 && assets.map(({ name, symbol, initialSupply }, index) => {
                                                return (
                                                    <Tr key={`${index}${name}${symbol}`}>
                                                        <Td>{name}</Td>
                                                        <Td>{ethers.utils.formatUnits(initialSupply, 18)}</Td>
                                                        <Td>{symbol}</Td>
                                                        <Td>0</Td>
                                                        <Td>{ethers.utils.formatUnits(initialSupply, 18)}</Td>
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
                                        <TableCaption>Actions sur les actifs</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Titre</Th>
                                                <Th>Phase 1</Th>
                                                <Th>Phase 2</Th>
                                                <Th>Annulation</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
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
                                            </Tr>
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
                        <Box mt='10'>
                            <Heading size='md'>Statut des KYC</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>Statut des KYC</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Adresses des utilisateurs</Th>
                                                <Th>Statut</Th>
                                                <Th isNumeric>Validation</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>0xf39...2266</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Pas valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[0]}
                                                        name='0'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xt76...5312</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[1]}
                                                        name='1'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xa87...5287</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Pas valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[2]}
                                                        name='2'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xb79...0956</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[3]}
                                                        name='3'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xx4...6342</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[4]}
                                                        name='4'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xh87...3207</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Pas valide</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[5]}
                                                        name='5'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                        </Tbody>
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

export default AdminBoard
