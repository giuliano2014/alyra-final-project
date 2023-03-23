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
  InputGroup,
  InputRightAddon,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const AddNewAsset = () => {
    const [assetName, setAssetName] = useState('')
    const [tokenName, setTokenName] = useState('')
    const [tokenSymbol, setTokenSymbol] = useState('')
    const [totalSupply, setTotalSupply] = useState(0)

    const isAssetNameError = assetName === ''
    const isTokenNameError = tokenName === ''
    const isTokenSymbolError = tokenSymbol === ''
    const isTotalSupplyError = totalSupply < 1 || Number.isNaN(totalSupply)

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Form values:', { assetName, tokenName, tokenSymbol, totalSupply })
    }

    const handleTotalSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || Number.isInteger(Number(value))) {
            setTotalSupply(parseInt(value, 10));
        }
    }

    return (
        <Box mt='10'>
            <Heading size='md'>Add a New Asset</Heading>
                <Card borderRadius='2xl' mt='4' padding='4'>
                    <Box as='form' onSubmit={handleSubmit}>
                        <VStack spacing={4} align='flex-end'>
                            <FormControl isInvalid={isAssetNameError}>
                                <FormLabel>Asset&apos;s name</FormLabel>
                                <Input onChange={(e) => setAssetName(e.target.value)} type='text' value={assetName} />
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
                                    type='text'
                                    value={tokenName}
                                    onChange={(e) => setTokenName(e.target.value)}
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
                                    type='text'
                                    value={tokenSymbol}
                                    onChange={(e) => setTokenSymbol(e.target.value)}
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
                                <InputGroup>
                                    <Input
                                        type='number'
                                        min={0}
                                        value={totalSupply}
                                        onChange={handleTotalSupplyChange}
                                        step={1}
                                    />
                                    <InputRightAddon>tokens</InputRightAddon>
                                </InputGroup>
                                {!isTotalSupplyError ? (
                                    <FormHelperText>
                                        Total supply should be superior or egal to 1.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Total supply is required and should be superior or egal to 1.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button type='submit' colorScheme='teal' isDisabled={isAssetNameError || isTokenSymbolError || isTokenSymbolError || isTotalSupplyError}>
                                Add
                            </Button>
                    </VStack>
                </Box>
            </Card>
        </Box>
    )
}

export default AddNewAsset
