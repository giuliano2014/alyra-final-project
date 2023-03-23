import { Alert, AlertIcon, Button, Flex, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState } from 'react'
import { useProvider } from 'wagmi'

import { abi, contractAddress } from "@/contracts/simpleStorage"
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Get = () => {
    const isAccountConnected = useIsAccountConnected()
    const provider = useProvider()
    const [number, setNumber] = useState(null)

    const getTheNumber = async() => {
        const contract = new ethers.Contract(contractAddress, abi, provider)
        let smartContractValue = await contract.get()
        setNumber(smartContractValue.toString())
    }

    if (!isAccountConnected) {
        return (
            <>
                <Alert status='warning'>
                <AlertIcon />
                    Please, connect your Wallet !
                </Alert>
            </>
        )
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
                <Button colorScheme='blue' onClick={() => getTheNumber()}>Get the number</Button>
                {number ? (
                    <Text ml='4'>{number}</Text> 
                ) : (
                    <Text ml='4'>Please, click on this button to get the number.</Text>
                )}
            </Flex>
        </>
    )
}

export default Get
