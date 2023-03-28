import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState } from 'react'
// import { useAccount, useProvider } from 'wagmi'
import { useProvider } from 'wagmi'

import { abi, contractAddress } from "@/contracts/factoryClone"
import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Get = () => {
    // const { address } = useAccount()
    const isAccountConnected = useIsAccountConnected()
    const provider = useProvider()
    const [assets, setAssets] = useState([])
    const [count, setCount] = useState(null)
    const [number, setNumber] = useState(null)

    // const getAssets = async () => {
    //     const contract = new ethers.Contract(contractAddress, abi, provider)
    //     const result = await contract.getAssets()
    //     console.log(result)
    //     setAssets(result)
    // }

    const getAssets = async () => {
        const contract = new ethers.Contract(contractAddress, abi, provider)
    
        // Ecoute l'événement 'AssetCreated' et récupère les assets lorsqu'il est émis
        contract.on("AssetCreated", async () => {
            const result = await contract.getAssets()
            console.log(result)
            setAssets(result)
        })
    
        // Récupère les assets initiaux une fois au chargement de la fonction
        const initialResult = await contract.getAssets()
        console.log(initialResult)
        setAssets(initialResult)
    }

    // const getAssetsList = async () => {
    //     const contract = new ethers.Contract(contractAddress, abi, provider)
    //     const result = await contract.getAssetsList()
    //     setAssets(result)
    // }

    // const getAssets = async () => {
    //     const contract = new ethers.Contract(contractAddress, abi, provider)
    //     const result = await contract.getAssets(address)
    //     setAssets(result)
    // }

    const getTheCount = async () => {
        const contract = new ethers.Contract(contractAddress, abi, provider)
        const result = await contract.count()
        setCount(result.toString())
    }

    const getTheNumber = async () => {
        const contract = new ethers.Contract(contractAddress, abi, provider)
        const result = await contract.get()
        setNumber(result.toString())
    }

    if (!isAccountConnected) {
        return <AccountNotConnectedWarning />
    }

    return (
        <>
            <Head>
                <title>HydrInvest - Get the Number</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex alignItems='center'>
                <Button colorScheme='blue' onClick={getTheNumber}>Get the number</Button>
                {number ? (
                    <Text ml='4'>{number}</Text> 
                ) : (
                    <Text ml='4'>Please, click on this button to get the number.</Text>
                )}
            </Flex>
            <Flex alignItems='center' mt='5'>
                <Button colorScheme='teal' onClick={getTheCount}>Get the count</Button>
                {count ? (
                    <Text ml='4'>{count}</Text> 
                ) : (
                    <Text ml='4'>Please, click on this button to get the count.</Text>
                )}
            </Flex>
            <Box alignItems='center' mt='5'>
            <Flex alignItems='center' mt='5'>
                <Button colorScheme='teal' onClick={getAssets}>Get assets</Button>
                {assets.length > 0 ? (
                    <Text ml='4'>This is the assets list.</Text> 
                ) : (
                    <Text ml='4'>Please, click on this button to get assets list.</Text>
                )}
                </Flex>
                {assets.length > 0 && (
                    <ul style={{padding: '20px'}}>
                        {assets.map(({token, name, symbol, initialSupply}) => {
                            return (
                                <li key={`${name}${symbol}`} style={{margin: '20px'}}>
                                    <Text ml='4'>Token Address : {token}</Text> 
                                    <Text ml='4'>Asset Name : {name}</Text> 
                                    <Text ml='4'>Token Symbol : {symbol}</Text> 
                                    <Text ml='4'>Token Quantity : { ethers.utils.formatUnits(initialSupply, 18)}</Text>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </Box>
        </>
    )
}

export default Get
