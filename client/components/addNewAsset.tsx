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

const AddNewAsset = () => {
    const [assetName, setAssetName] = useState('')
    const [tokenName, setTokenName] = useState('')
    const [totalSupply, setTotalSupply] = useState(0)
    const [tokenSymbol, setTokenSymbol] = useState('')

    const isAssetNameError = assetName === ''
    const isTokenNameError = tokenName === ''
    const isTotalSupplyError = totalSupply < 1
    const isTokenSymbolError = tokenSymbol === ''

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('Form values:', { assetName, tokenName, totalSupply, tokenSymbol })
    }

    return (
        <Box mt='10'>
            <Heading size='md'>Add a New Asset</Heading>
                <Card borderRadius='2xl' mt='4' padding='4'>
                    <Box as='form' onSubmit={handleSubmit}>
                        <VStack align='flex-end' spacing={4}>
                            <FormControl isInvalid={isAssetNameError}>
                                <FormLabel>Asset&apos;s name</FormLabel>
                                <Input
                                    onChange={(e) => setAssetName(e.target.value)}
                                    value={assetName}
                                />
                                {!isAssetNameError ? (
                                    <FormHelperText>
                                        Asset&apos;s name should be shortest possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Asset&apos;s name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isTokenNameError}>
                                <FormLabel>Token&apos;s name</FormLabel>
                                <Input
                                    onChange={(e) => setTokenName(e.target.value)}
                                    value={tokenName}
                                />
                                {!isTokenNameError ? (
                                    <FormHelperText>
                                        Token&apos;s name should be shortest possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Token&apos;s name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isTokenSymbolError}>
                                <FormLabel>Token&apos;s symbol</FormLabel>
                                <Input
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    value={tokenSymbol}
                                />
                                {!isTokenSymbolError ? (
                                    <FormHelperText>
                                        Token&apos;s symbol should be shortest possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Token&apos;s symbol is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isTotalSupplyError}>
                                <FormLabel>Total supply</FormLabel>
                                <NumberInput
                                    defaultValue={0}
                                    min={1}
                                    onChange={(e: any) => setTotalSupply(e)}
                                    step={1}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!isTotalSupplyError ? (
                                    <FormHelperText>
                                        Total supply should be superior or egal to 1.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Total supply is required and should be superior or egal to 1.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button
                                colorScheme='teal'
                                isDisabled={
                                    isAssetNameError ||
                                    isTokenSymbolError ||
                                    isTokenSymbolError ||
                                    isTotalSupplyError
                                }
                                type='submit'
                            >
                                Add
                            </Button>
                    </VStack>
                </Box>
            </Card>
        </Box>
    )
}

export default AddNewAsset
