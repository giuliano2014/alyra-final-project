import { Alert, AlertIcon, Button, Flex, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState } from 'react'
import { useAccount, useProvider } from 'wagmi'

import { abi, contractAddress } from "@/contracts/simpleStorage"

const Get = () => {
    const { isConnected } = useAccount()
    const provider = useProvider()
    const [number, setNumber] = useState(null)

    const getTheNumber = async() => {
        const contract = new ethers.Contract(contractAddress, abi, provider)
        let smartContractValue = await contract.get()
        setNumber(smartContractValue.toString())
    }

    return (
        <>
            <Head>
                <title>HydrInvest - Get the Number</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isConnected ? (
                <Flex alignItems="center">
                    <Button colorScheme='blue' onClick={() => getTheNumber()}>Get the number</Button>
                    {number ? (
                        <Text ml="1rem">{number}</Text> 
                    ) : (
                        <Text ml="1rem">Please, click on this button to get the number.</Text>
                    )}
                </Flex>
            ) : (
                <Alert status='warning' width="50%">
                    <AlertIcon />
                    Please, connect your Wallet!
                </Alert>
            )}
        </>
    )
}

export default Get
