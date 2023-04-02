import {
    Badge,
    Box,
    Button,
    Card,
    Heading,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"
import { FC } from "react"

type KycProps = {
    kycValidations: any[]
    validateKyc: (id: string, isValidated: boolean) => void
}

const Kyc: FC<KycProps>  = ({
    kycValidations,
    validateKyc
}) => {
    return (
        <Box mt='10'>
            <Heading size='md'>Statut des KYC</Heading>
            <Card borderRadius='2xl' mt='4'>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>
                            {kycValidations.length > 0 ? 'Statut des KYC' : 'Aucune demande de KYC en cours'}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Numéro de demande</Th>
                                <Th>Adresses des utilisateurs</Th>
                                <Th>Statut</Th>
                                <Th isNumeric>Validation</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {kycValidations.length > 0 && kycValidations.map(({ 
                                id,
                                userAddress,
                                isValidated,
                                validationStatus
                            }, index) => (
                                <Tr key={id}>
                                    <Td>#{index + 1}</Td>
                                    <Td>{userAddress.slice(0, 5)}...{userAddress.slice(-4)}</Td>
                                    <Td>
                                        {isValidated && <Badge colorScheme="green">Validé</Badge>}
                                        {!isValidated && validationStatus !== "in progress" &&
                                            <Badge colorScheme="red">Refusé</Badge>
                                        }
                                        {!isValidated && validationStatus === "in progress" &&
                                            <Badge colorScheme="orange">En attente</Badge>
                                        }
                                    </Td>
                                    <Td isNumeric>
                                        
                                        <Button
                                            size='sm'
                                            mr='4'
                                            colorScheme='red'
                                            isDisabled={!isValidated && validationStatus !== "in progress"}
                                            onClick={() => validateKyc(id, false)}
                                            variant='solid'
                                        >
                                            Refuser
                                        </Button>
                                        <Button
                                            size='sm'
                                            colorScheme='teal'
                                            isDisabled={isValidated}
                                            onClick={() => validateKyc(id, true)}
                                            variant='solid'
                                        >
                                            Valider
                                        </Button>
                                        
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default Kyc