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
    askForKycValidationEvents: any[]
    validateKyc: (userAddress: string) => void
    notValidateKyc: (userAddress: string) => void
}

const Kyc: FC<KycProps>  = ({
    askForKycValidationEvents,
    validateKyc,
    notValidateKyc
}) => {
    return (
        <Box mt='10'>
            <Heading size='md'>Statut des KYC</Heading>
            <Card borderRadius='2xl' mt='4'>
                <TableContainer>
                    <Table variant='striped' minH={askForKycValidationEvents.length > 0 ? 'auto' : '150'}>
                        <TableCaption>{askForKycValidationEvents.length > 0 ? 'Statut des KYC' : 'Aucune demande de KYC en cours'}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Numéro de demande</Th>
                                <Th>Adresses des utilisateurs</Th>
                                <Th>Statut</Th>
                                <Th isNumeric>Validation</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {askForKycValidationEvents.length > 0 && askForKycValidationEvents.map(({ userAddress, validated, status }, index) => (
                                <Tr key={index}>
                                    <Td>#{index + 1}</Td>
                                    <Td>{userAddress.slice(0, 5)}...{userAddress.slice(-4)}</Td>
                                    <Td>
                                        {validated && <Badge colorScheme="green">Validé</Badge>}
                                        {!validated && status !== "in progress" && <Badge colorScheme="red">Résusé</Badge>}
                                        {!validated && status === "in progress" && <Badge colorScheme="orange">En attente</Badge>}
                                    </Td>
                                    <Td isNumeric>
                                        
                                        <Button
                                        size='sm'
                                            mr='4'
                                            colorScheme='red'
                                            onClick={() => notValidateKyc(userAddress)}
                                            variant='solid'
                                        >
                                            Refuser
                                        </Button>
                                        <Button
                                            size='sm'
                                            colorScheme='teal'
                                            onClick={() => validateKyc(userAddress)}
                                            variant='solid'
                                        >
                                            Valider
                                        </Button>
                                        
                                    </Td>
                                </Tr>
                            ))}
                            {/* {askForKycValidationEvents.length > 0 && askForKycValidationEvents.map((event, index) => (
                                <Tr key={index}>
                                    <Td>#{index + 1}</Td>
                                    <Td>{event.args[0].userAddress.slice(0, 5)}...{event.args[0].userAddress.slice(-4)}</Td>
                                    <Td>
                                        {event.args[0].validated && <Badge colorScheme="green">Validé</Badge>}
                                        {!event.args[0].validated && event.args[0].status !== "in progress" && <Badge colorScheme="red">Résusé</Badge>}
                                        {!event.args[0].validated && event.args[0].status === "in progress" && <Badge colorScheme="orange">En attente</Badge>}
                                    </Td>
                                    <Td isNumeric>
                                        
                                        <Button
                                        size='sm'
                                            mr='4'
                                            colorScheme='red'
                                            onClick={() => notValidateKyc(event.args[0].userAddress)}
                                            variant='solid'
                                        >
                                            Refuser
                                        </Button>
                                        <Button
                                            size='sm'
                                            colorScheme='teal'
                                            onClick={() => validateKyc(event.args[0].userAddress)}
                                            variant='solid'
                                        >
                                            Valider
                                        </Button>
                                        
                                    </Td>
                                </Tr>
                            ))} */}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default Kyc