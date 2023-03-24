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
            <Heading size='md'>Ajouter un nouvel actif</Heading>
                <Card borderRadius='2xl' mt='4' padding='4'>
                    <Box as='form' onSubmit={handleSubmit}>
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
                            <FormControl isInvalid={isTokenNameError}>
                                <FormLabel>Nom du token</FormLabel>
                                <Input
                                    onChange={(e) => setTokenName(e.target.value)}
                                    value={tokenName}
                                />
                                {!isTokenNameError ? (
                                    <FormHelperText>
                                        Le nom du token doit être le plus court possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le nom du token est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isTokenSymbolError}>
                                <FormLabel>Symbol du token</FormLabel>
                                <Input
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    value={tokenSymbol}
                                />
                                {!isTokenSymbolError ? (
                                    <FormHelperText>
                                        Le symbol du token doit être le plus court possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le symbol du token est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isTotalSupplyError}>
                                <FormLabel>Nombre total de token</FormLabel>
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
                                    isTokenSymbolError ||
                                    isTokenSymbolError ||
                                    isTotalSupplyError
                                }
                                type='submit'
                            >
                                Ajouter
                            </Button>
                    </VStack>
                </Box>
            </Card>
        </Box>
    )
}

export default AddNewAsset
