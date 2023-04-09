import { RepeatIcon } from "@chakra-ui/icons"
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
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
    Stack,
    Text,
    VStack
} from "@chakra-ui/react"
import { FC, FormEvent, useEffect } from "react"

type FundProps = {
    financialVehicleBalance: string
    getBalanceOfFinancialVehicle: () => void
    recipientAddress: string
    setRecipientAddress: (value: string) => void
    setWithdrawAmount: (value: number) => void
    withdrawAmount: number
    withdrawFromFinancialVehicle: (event: FormEvent) => void
}

const Fund: FC<FundProps> = ({
    financialVehicleBalance,
    getBalanceOfFinancialVehicle,
    recipientAddress,
    setRecipientAddress,
    setWithdrawAmount,
    withdrawAmount,
    withdrawFromFinancialVehicle
}) => {
    const isRecipientAddressError = recipientAddress === ''
    const isWithdrawAmountError = withdrawAmount < 1

    useEffect(() => {
        getBalanceOfFinancialVehicle()
    }, [getBalanceOfFinancialVehicle])

    return (
        <Box mt='10'>
            <Heading size='md'>Gestion des fonds</Heading>
            <Card borderRadius='2xl' mt='4'>
                <CardHeader>
                    <Heading size='sm'>Balance du véhicule d&apos;acquisition</Heading>
                </CardHeader>
                <Divider color='#e2e8f0' />
                <CardBody>
                    <Stack alignItems='center' direction='row' spacing={4}>
                        <Button
                            leftIcon={<RepeatIcon />}
                            colorScheme='teal'
                            onClick={getBalanceOfFinancialVehicle}
                            variant='solid'
                        >
                            Rafraichir
                        </Button>
                        <Text fontSize='md'>
                            {financialVehicleBalance === '' ? '...' : `${financialVehicleBalance} ETH`}
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
            <Card borderRadius='2xl' mt='10'>
                <CardHeader>
                    <Heading size='sm'>Retirer des fonds</Heading>
                </CardHeader>
                <Divider color='#e2e8f0' />
                <CardBody>
                    <Box as='form' onSubmit={withdrawFromFinancialVehicle}>
                        <VStack align='flex-end' spacing={4}>
                            <FormControl isInvalid={isRecipientAddressError}>
                                <FormLabel>Adresse du destinataire</FormLabel>
                                <Input
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    value={recipientAddress}
                                />
                                {!isRecipientAddressError ? (
                                    <FormHelperText>
                                        Indiquez l&apos;adresse du destinataire à créditer.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>L&apos;adresse du destinataire est obligatoire.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isWithdrawAmountError}>
                                <FormLabel>Montant à transférer</FormLabel>
                                <NumberInput
                                    defaultValue={0}
                                    min={1}
                                    onChange={(e: any) => setWithdrawAmount(e)}
                                    step={1}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!isWithdrawAmountError ? (
                                    <FormHelperText>
                                        Le montant minimum doit être supérieur ou égal à 1.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Le montant est obligatoire et doit être supérieur ou égal à 1.</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button
                                colorScheme='teal'
                                isDisabled={
                                    isRecipientAddressError ||
                                    isWithdrawAmountError
                                }
                                type='submit'
                            >
                                Retirer
                            </Button>
                        </VStack>
                    </Box>
                </CardBody>
            </Card>
        </Box>
    )
}

export default Fund