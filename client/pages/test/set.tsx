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
import { ChangeEvent, useState } from 'react'
import { useSigner } from 'wagmi'

import { abi, contractAddress } from "@/contracts/simpleStorage"
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Set = () => {
    const isAccountConnected = useIsAccountConnected()
    const router = useRouter()
    const { data: signer } = useSigner()
    const [number, setNumber] = useState<string>('')
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
                description: 'The number has been changed !',
                status: 'success',
                duration: 9000,
                isClosable: true
            })
        }
        catch(e) {
            toast({
                title: 'Error',
                description: 'An error occured.',
                status: 'error',
                duration: 9000,
                isClosable: true
            })
            console.log(e)
        }
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
                <title>HydrInvest - Set the Number</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex alignItems="center">
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                    placeholder='Your number...'
                />
                <Button colorScheme='blue' onClick={() => setTheNumber()}>Set</Button>
            </Flex>
        </>
    )
}

export default Set
