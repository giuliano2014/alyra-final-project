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

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'
import { abi, contractAddress } from '@/contracts/Asset'

const Asset = () => {
    const isAccountConnected = useIsAccountConnected()
    const router = useRouter()
    const { data: signer } = useSigner()
    const [name, setName] = useState<string>('')
    const [symbol, setSymbol] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const toast = useToast()

    const setAsset = async() => {
        if (!signer) return

        console.log(name, symbol, quantity)

        try {
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.create(name, symbol, quantity)
            await transaction.wait()
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
        return <AccountNotConnectedWarning />
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder='Your number...'
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
                    placeholder='Your number...'
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
                    placeholder='Your number...'
                />
                <Button colorScheme='blue' onClick={() => setAsset()}>Set</Button>
            </Flex>
        </>
    )
}

export default Asset
