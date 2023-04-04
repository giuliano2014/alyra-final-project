import {
    Button,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    StackDivider,
    Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Head from 'next/head'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useProvider } from 'wagmi'

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import { financialVehicleContractAddress, financialVehicleAbi } from '@/contracts/financialVehicle'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

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

const Assets = () => {
    const isAccountConnected = useIsAccountConnected()
    const provider = useProvider()
    const [assets, setAssets] = useState<FormattedAsset[]>([])

    useEffect(() => {
        getAssets()
    }, [assets, isAccountConnected])

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

            return formattedResult
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
                const formattedResult = await fetchAndFormatAssets()
                if (formattedResult) {
                    setAssets(formattedResult)
                } else {
                    console.error("Error fetching and formatting assets.")
                }
            })
    
            const formattedResult = await fetchAndFormatAssets()
            if (formattedResult) {
                setAssets(formattedResult)
            } else {
                console.error("Error fetching and formatting assets.")
            }
        } catch (error) {
            console.error("Error getting assets:", error)
        }
    }

    return (
        <>
            <Head>
                <title>HydrInvest - Assets</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Nos actifs</Heading>
                <Text fontSize='xl' mt='10'>Multipliez votre exposition à vos crypto actifs préférés.</Text>
                <Text fontSize='xl'>Parcourez nos produits ou sélectionnez un actif.</Text>
                {!isAccountConnected &&
                    <Box mt='10'>
                        <AccountNotConnectedWarning />
                    </Box>
                }
                {isAccountConnected && assets.length === 0 && (
                    <Heading mt='10' size='md'>Actuellement, aucun actif à la vente...</Heading>
                )}
            </Box>
            {assets.length > 0 && (
                <SimpleGrid minChildWidth='xs' mt='20' spacing='40px'>
                    {assets.map(({ assetAddress, name, symbol, totalSupply }) => (
                        <Card borderRadius='2xl' w='100%' key={assetAddress}>
                            <CardHeader>
                                <Heading size='md'>{name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Nature de l&apos;actif
                                        </Heading>
                                        <Text fontSize='sm' pt='2'>
                                            Portefeuille diversifié d’actifs forestiers
                                        </Text>
                                    </Box>
                                    <Card bg='teal.100' borderRadius='2xl'>
                                        <CardBody textAlign='center'>
                                            <Text>Avec 100 USDC 👇</Text>
                                            <Heading size='xs'>Obtenez 1 {symbol}</Heading>
                                        </CardBody>
                                    </Card>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Nom du token de l&apos;actif
                                        </Heading>
                                        <Text fontSize='sm' pt='2'>
                                            {symbol}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Nombre de token émis
                                        </Heading>
                                        <Text fontSize='sm' pt='2'>
                                            {totalSupply}
                                        </Text>
                                    </Box>  
                                </Stack>
                            </CardBody>
                            <Divider color='#e2e8f0' />
                            <CardFooter justifyContent='end'>
                                <Button
                                    as={NextLink}
                                    color='white'
                                    colorScheme='blue'
                                    href={`/assets/${assetAddress}`}
                                >
                                    En savoir plus
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </>
    )
}

export default Assets
