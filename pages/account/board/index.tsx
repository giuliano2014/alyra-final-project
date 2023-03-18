import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Tab,
    Table,
    TableCaption,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'

const Board = () => {
    const [assetName, setAssetName] = useState('')
    const isAssetNameError = assetName === ''

    const handleInputAssetNameChange = (e: ChangeEvent<HTMLInputElement>): void => setAssetName(e.target.value)
  
    return (
        <>
            <Head>
                <title>HydrInvest - Account Board</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box pb='4' pl='4' pr='4' pt='20'>
                <Container maxW='container.lg'>
                    <Box textAlign='center'>
                        <Heading size='2xl'>Board</Heading>
                        <Text fontSize='xl' mt='10'>Multiply your exposure to your favorite crypto assets. Browse our featured products or select a asset.</Text>
                        <Text fontSize='xl'>We&apos;ve launched Multiply for Aave.</Text>
                    </Box>
                    <Tabs colorScheme='purple' isLazy  mt='100' variant='soft-rounded'>
                        <TabList>
                            <Tab>Asset Management</Tab>
                            <Tab>KYC Management</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box mt='10'>
                                    <Heading size='md'>Assets list</Heading>
                                    <Card borderRadius='2xl' mt='4'>
                                        <TableContainer>
                                            <Table colorScheme='purple' variant='striped'>
                                                <TableCaption>Imperial to metric conversion factors</TableCaption>
                                                <Thead>
                                                    <Tr>
                                                        <Th>To convert</Th>
                                                        <Th>into</Th>
                                                        <Th isNumeric>multiply by</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>inches</Td>
                                                        <Td>millimetres (mm)</Td>
                                                        <Td isNumeric>25.4</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>feet</Td>
                                                        <Td>centimetres (cm)</Td>
                                                        <Td isNumeric>30.48</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>yards</Td>
                                                        <Td>metres (m)</Td>
                                                        <Td isNumeric>0.91444</Td>
                                                    </Tr>
                                                </Tbody>
                                                <Tfoot>
                                                    <Tr>
                                                        <Th>To convert</Th>
                                                        <Th>into</Th>
                                                        <Th isNumeric>multiply by</Th>
                                                    </Tr>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                </Box>
                                <Card borderRadius='2xl' mt='10'>
                                    <Stack direction='row' p={4}>
                                        <Heading minW='25%' size='md'>Add a new asset</Heading>
                                        <Divider h='auto' orientation='vertical' />
                                        <FormControl isInvalid={isAssetNameError} padding='4'>
                                            <FormLabel>Asset&apos;s name</FormLabel>
                                            <Input onChange={handleInputAssetNameChange} type='text' value={assetName} />
                                            {!isAssetNameError ? (
                                                <FormHelperText>
                                                    Asset&apos;s name should be shortest possible.
                                                </FormHelperText>
                                            ) : (
                                                <FormErrorMessage>Asset&apos;s name is required.</FormErrorMessage>
                                            )}
                                            <Button colorScheme='purple' mt='4' type='submit'>Add</Button>
                                        </FormControl>
                                    </Stack>
                                </Card>
                            </TabPanel>
                            <TabPanel>
                                <p>KYC</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </Box>
        </>
    )
}

export default Board
