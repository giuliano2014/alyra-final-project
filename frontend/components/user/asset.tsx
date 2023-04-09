import {
    Box,
    Card,
    Heading,
    Table,
    TableCaption,
    TableContainer,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"

const Asset = () => {
    return (
        <Box mt='10'>
            <Heading size='md'>Mes actifs</Heading>
            <Card borderRadius='2xl' mt='4'>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>Vos n&apos;avez pas encore acheté d&apos;actif</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Titre</Th>
                                <Th>Nb de token</Th>
                                <Th>Symbol du token</Th>
                            </Tr>
                        </Thead>
                        {/* <Tbody>
                            <Tr>
                                <Td>Actif #3</Td>
                                <Td>1.500</Td>
                                <Td>ATT</Td>
                            </Tr>
                            <Tr>
                                <Td>Actif #11</Td>
                                <Td>500</Td>
                                <Td>AET</Td>
                            </Tr>
                            <Tr>
                                <Td>Actif #5</Td>
                                <Td>50.000</Td>
                                <Td>AFT</Td>
                            </Tr>
                        </Tbody> */}
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default Asset