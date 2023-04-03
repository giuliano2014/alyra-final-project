import { RepeatIcon } from "@chakra-ui/icons"
import {
    Box,
    Button,
    Card,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react"
import { FC, useEffect } from "react"

type FundProps = {
    financialVehicleBalance: string
    getBalanceOfFinancialVehicle: () => void
}

const Fund: FC<FundProps>   = ({
    financialVehicleBalance,
    getBalanceOfFinancialVehicle
}) => {
    useEffect(() => {
        getBalanceOfFinancialVehicle()
    }, [getBalanceOfFinancialVehicle])

    return (
        <Box mt='10'>
            <Heading size='md'>Gestion des fonds</Heading>
            <Card borderRadius='2xl' mt='4' padding='4'>
                <Heading size='sm'>Solde du véhicule financier</Heading>
                <Stack alignItems='center' direction='row' mt='4' spacing={4}>
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
            </Card>
        </Box>
    )
}

export default Fund