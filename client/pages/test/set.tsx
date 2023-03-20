import {
    Alert,
    AlertIcon,
    Button,
    Flex,
    Input,
    useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

import { abi, contractAddress } from "@/contracts/simpleStorage"

const Set = () => {
    const { isConnected } = useAccount()
    const router = useRouter()
    const { data: signer } = useSigner()
    const [number, setNumber] = useState(null)
    const toast = useToast()

    const setTheNumber = async() => {
        if (!signer) return

        try {
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.set(number)
            await transaction.wait()
            router.push('/test/get')
            toast({
                title: 'Congratulations',
                description: "the number has been changed!",
                status: 'success',
                duration: 9000,
                isClosable: true
            })
        }
        catch(e) {
            toast({
                title: 'Error',
                description: "An error occured.",
                status: 'error',
                duration: 9000,
                isClosable: true
            })
            console.log(e)
        }
    }

    return (
        <>
            <Head>
                <title>HydrInvest - Set the Number</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isConnected ? (
                <Flex alignItems="center">
                    <Input placeholder='Your number...' onChange={(e: any) => setNumber(e.target.value)} />
                    <Button colorScheme='blue' onClick={() => setTheNumber()}>Set</Button>
                </Flex>
                ) : (
                <Alert status='warning' width="50%">
                    <AlertIcon />
                    Please, connect your Wallet.
                </Alert>
            )}
        </>
    )
}

export default Set
