import {
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
import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Set = () => {
    const isAccountConnected = useIsAccountConnected()
    const router = useRouter()
    const { data: signer } = useSigner()
    const [assetName, setAssetName] = useState<string>('')
    const [assetQuantity, setAssetQuantity] = useState(0)
    const [assetSymbol, setAssetSymbol] = useState<string>('')
    const [count, setCount] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const toast = useToast()

    const addAsset = async () => {
        if (!signer) return

        try {
            const contract = new ethers.Contract(contractAddress, abi, signer)
            const assetQuantityBigNumber = ethers.utils.parseUnits(assetQuantity.toString(), 'ether')
            let transaction = await contract.addAsset(assetName, assetSymbol, assetQuantityBigNumber)
            await transaction.wait()
            router.push('/test/get')
            toast({
                title: 'Congratulations',
                description: 'Asset have been added !',
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

    const setTheNumber = async () => {
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

    const setIncrement = async () => {
        if (!signer) return

        try {
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.increment(count)
            await transaction.wait()
            router.push('/test/get')
            toast({
                title: 'Congratulations',
                description: 'The count has been incremented !',
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                    placeholder='Your number...'
                />
                <Button colorScheme='blue' onClick={() => setTheNumber()}>Set</Button>
            </Flex>
            <Flex alignItems="center" mt='5'>
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCount(e.target.value)}
                    placeholder='Your number...'
                />
                <Button colorScheme='teal' onClick={() => setIncrement()}>Increment</Button>
            </Flex>
            <Flex alignItems="center" mt="5">
                <Input
                    type="text"
                    onChange={e => setAssetName(e.target.value)}
                    placeholder="Asset Name"
                />
                <Input
                    type="text"
                    onChange={e => setAssetSymbol(e.target.value)}
                    placeholder="Token Symbol"
                />
                <Input
                    type="number"
                    onChange={e => setAssetQuantity(Number(e.target.value))}
                    placeholder="Token Quantity"
                />
                <Button colorScheme="teal" onClick={() => addAsset()}>
                    Add
                </Button>
            </Flex>
        </>
    )
}

export default Set
