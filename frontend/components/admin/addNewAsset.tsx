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
import React, { FC, FormEvent } from 'react'

type AddNewAssetProps = {
    assetName: string
    assetSymbol: string
    assetTotalSupply: number
    createAsset: (event: FormEvent) => void
    setAssetName: (value: string) => void
    setAssetSymbol: (value: string) => void
    setAssetTotalSupply: (value: number) => void
}

const AddNewAsset: FC<AddNewAssetProps> = ({
    assetName,
    assetSymbol,
    assetTotalSupply,
    createAsset,
    setAssetName,
    setAssetSymbol,
    setAssetTotalSupply
}) => {
    const isAssetNameError = assetName === ''
    const isAssetSymbolError = assetSymbol === ''
    const isAssetTotalSupplyError = assetTotalSupply < 1

    return (
        <Box mt='10'>
            <Heading size='md'>Ajouter un nouvel actif</Heading>
                <Card borderRadius='2xl' mt='4' padding='4'>
                    <Box as='form' onSubmit={createAsset}>
                        <VStack align='flex-end' spacing={4}>
                            <FormControl isInvalid={isAssetNameError}>
                                <FormLabel>Nom de l&apos;actif</FormLabel>
                                <Input
                                    onChange={(e) => setAssetName(e.target.value)}
                                    value={assetName}
                                />
                                {!isAssetNameError ? (
                                    <FormHelperText>
                                        Le nom de l&apos;actif doit être le plus court possible.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le nom de l&apos;actif est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isAssetSymbolError}>
                                <FormLabel>Symbol du token</FormLabel>
                                <Input
                                    onChange={(e) => setAssetSymbol(e.target.value)}
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
