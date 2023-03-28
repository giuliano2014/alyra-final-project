import {
    Box,
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import { abi, contractAddress } from "@/contracts/financialVehicle"
import { ethers } from 'ethers'
import { useSigner } from 'wagmi'

const AddNewAsset = () => {
    const [assetName, setAssetName] = useState('')
    const [assetTotalSupply, setAssetTotalSupply] = useState(0)
    const [assetSymbol, setAssetTokenSymbol] = useState('')

    const isAssetNameError = assetName === ''
    const isAssetTotalSupplyError = assetTotalSupply < 1
    const isAssetSymbolError = assetSymbol === ''

    const { data: signer } = useSigner()

    const createAsset = async (event: any) => {
        event.preventDefault()

        if (!signer) return

        try {
            const contract = new ethers.Contract(contractAddress, abi, signer)
            const assetTotalSupplyBigNumber = ethers.utils.parseUnits(assetTotalSupply.toString(), 'ether')
            const transaction = await contract.createAsset(assetName, assetSymbol, assetTotalSupplyBigNumber)
            const result = await transaction.wait()

            console.log('result', result)

            contract.on("AssetCreated", async (event) => {
                console.log('AssetCreated', event)
            })
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <Box mt='10'>
            <Heading size='md'>Ajouter un nouvel actif</Heading>
                <Card borderRadius='2xl' mt='4' padding='4'>
                    <Box as='form' onSubmit={createAsset}>
                        <VStack align='flex-end' spacing={4}>
                            <FormControl isInvalid={isAssetNameError}>
                                <FormLabel>Titre de l&apos;actif</FormLabel>
                                <Input
                                    onChange={(e) => setAssetName(e.target.value)}
                                    value={assetName}
                                />
                                {!isAssetNameError ? (
                                    <FormHelperText>
                                        Le titre de l&apos;actif doit être le plus court possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le titre de l&apos;actif est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isAssetSymbolError}>
                                <FormLabel>Symbol du token</FormLabel>
                                <Input
                                    onChange={(e) => setAssetTokenSymbol(e.target.value)}
                                    value={assetSymbol}
                                />
                                {!isAssetSymbolError ? (
                                    <FormHelperText>
                                        Le symbol du token doit être le plus court possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le symbol du token est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isAssetTotalSupplyError}>
                                <FormLabel>Nombre total de token</FormLabel>
                                <NumberInput
                                    defaultValue={0}
                                    min={1}
                                    onChange={(e: any) => setAssetTotalSupply(e)}
                                    step={1}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!isAssetTotalSupplyError ? (
                                    <FormHelperText>
                                        Le nombre total de token doit être supérieur ou égal à 1.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le nombre total de token est obligatoire et doit être supérieur ou égal à 1.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button
                                colorScheme='teal'
                                isDisabled={
                                    isAssetNameError ||
                                    isAssetSymbolError ||
                                    isAssetTotalSupplyError
                                }
                                type='submit'
                            >
                                Créer un actif
                            </Button>
                    </VStack>
                </Box>
            </Card>
        </Box>
    )
}

export default AddNewAsset
