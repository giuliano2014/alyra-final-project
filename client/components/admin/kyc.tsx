import {
    Badge,
    Box,
    Card,
    Heading,
    Switch,
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
    handleSwitchChange: (event: any) => void
    // handleSwitchChangeTest: (event: any) => void
    switchStates: Record<string, boolean>
    // switchStatesTest: Record<string, boolean>
}

const Kyc: FC<KycProps>  = ({
    askForKycValidationEvents,
    handleSwitchChange,
    // handleSwitchChangeTest,
    switchStates,
    // switchStatesTest
}) => {
    return (
        <>
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
                                {askForKycValidationEvents.length > 0 && askForKycValidationEvents.map((event, index) => (
                                    <Tr key={index}>
                                        <Td>#{index + 1}</Td>
                                        <Td>{event.args.userAddress.slice(0, 5)}...{event.args.userAddress.slice(-4)}</Td>
                                        <Td>
                                            <Badge colorScheme="red">Pas valide</Badge>
                                        </Td>
                                        <Td isNumeric>
                                            <Switch
                                                colorScheme="teal" 
                                                isChecked={switchStates[index]}
                                                name={index.toString()}
                                                onChange={handleSwitchChange}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>
            {/* <Box mt='10'>
                <Heading size='md'>Test UI</Heading>
                <Card borderRadius='2xl' mt='4'>
                    <TableContainer>
                        <Table variant='striped'>
                            <TableCaption>Test UI</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Adresses des utilisateurs</Th>
                                    <Th>Statut</Th>
                                    <Th isNumeric>Validation</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>0xf39...2266</Td>
                                    <Td>
                                        <Badge colorScheme="red">Pas valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[0]}
                                            name='0'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>0xt76...5312</Td>
                                    <Td>
                                        <Badge colorScheme="green">Valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[1]}
                                            name='1'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>0xa87...5287</Td>
                                    <Td>
                                        <Badge colorScheme="red">Pas valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[2]}
                                            name='2'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>0xb79...0956</Td>
                                    <Td>
                                        <Badge colorScheme="green">Valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[3]}
                                            name='3'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>0xx4...6342</Td>
                                    <Td>
                                        <Badge colorScheme="green">Valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[4]}
                                            name='4'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>0xh87...3207</Td>
                                    <Td>
                                        <Badge colorScheme="red">Pas valide</Badge>
                                    </Td>
                                    <Td isNumeric>
                                        <Switch
                                            colorScheme="teal" 
                                            isChecked={switchStatesTest[5]}
                                            name='5'
                                            onChange={handleSwitchChangeTest}
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box> */}
        </>
    )
}

export default Kyc