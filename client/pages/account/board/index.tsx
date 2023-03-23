import {
    Badge,
    Box,
    Button,
    Card,
    Heading,
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
    Th,
    Thead,
    Tr,
    Switch
} from '@chakra-ui/react'
import Head from 'next/head'
import { ChangeEventHandler, useState } from 'react'

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'
import AddNewAsset from '@/components/addNewAsset'

const Board = () => {
    const isAccountConnected = useIsAccountConnected()
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})

    const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        setSwitchStates({
            ...switchStates,
            [event.target.name]: event.target.checked
        })
    }

    if (!isAccountConnected) {
        return <AccountNotConnectedWarning />
    }
  
    return (
        <>
            <Head>
                <title>HydrInvest - Account Board</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box mt='16' textAlign='center'>
                <Heading size='xl'>Board</Heading>
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
                            <Heading size='md'>Asset Metrics</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>Asset Metrics</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Asset&apos;s title</Th>
                                                <Th>Total supply</Th>
                                                <Th>Supply symbol</Th>
                                                <Th>Supply sold</Th>
                                                <Th>Supply left</Th>
                                                <Th>Status</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Asset #1</Td>
                                                <Td>200.000</Td>
                                                <Td>AFT</Td>
                                                <Td>130.000</Td>
                                                <Td>70.000</Td>
                                                <Td>
                                                    <Badge colorScheme="orange">Sale in progress</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #2</Td>
                                                <Td>1.000.000</Td>
                                                <Td>AST</Td>
                                                <Td>350.000</Td>
                                                <Td>650.000</Td>
                                                <Td>
                                                    <Badge colorScheme="orange">Second round</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #3</Td>
                                                <Td>50.000</Td>
                                                <Td>ATT</Td>
                                                <Td>50.000</Td>
                                                <Td>0</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Sale is closed</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #4</Td>
                                                <Td>500.000</Td>
                                                <Td>AQT</Td>
                                                <Td>0</Td>
                                                <Td>500.000</Td>
                                                <Td>
                                                    <Badge>Sale not started</Badge>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #5</Td>
                                                <Td>2.000.000</Td>
                                                <Td>ACT</Td>
                                                <Td>1.300.000</Td>
                                                <Td>700.000</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Sale canceled</Badge>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                        <Box mt='10'>
                            <Heading size='md'>Asset Workflow Actions</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>Asset Workflow Actions</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Asset&apos;s title</Th>
                                                <Th>Lock time 1</Th>
                                                <Th>Lock time 2</Th>
                                                <Th>Cancel</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Asset #1</Td>
                                                <Td>
                                                    <Button
                                                        colorScheme='teal'
                                                        isLoading
                                                        loadingText='In progress'
                                                        size='xs'
                                                        spinnerPlacement='start'
                                                        variant='outline'
                                                    >
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' size='xs'>
                                                        Stop
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #2</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button
                                                        colorScheme='teal'
                                                        isLoading
                                                        loadingText='In progress'
                                                        size='xs'
                                                        spinnerPlacement='start'
                                                        variant='outline'
                                                    >
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' size='xs'>
                                                        Stop
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #3</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Stop
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #4</Td>
                                                <Td>
                                                    <Button colorScheme='teal' size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Stop
                                                    </Button>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Asset #5</Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='teal' isDisabled size='xs'>
                                                        Start
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button colorScheme='red' isDisabled size='xs'>
                                                        Stop
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                        <AddNewAsset />
                    </TabPanel>
                    <TabPanel>
                        <Box mt='10'>
                            <Heading size='md'>KYC Status</Heading>
                            <Card borderRadius='2xl' mt='4'>
                                <TableContainer>
                                    <Table variant='striped'>
                                        <TableCaption>KYC Status</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>User&apos;s Address</Th>
                                                <Th>Status</Th>
                                                <Th isNumeric>KYC Validation</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>0xf39...2266</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Not Valid</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[0]}
                                                        name='0'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xt76...5312</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Valid</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[1]}
                                                        name='1'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>0xa87...5287</Td>
                                                <Td>
                                                    <Badge colorScheme="red">Not Valid</Badge>
                                                </Td>
                                                <Td isNumeric>
                                                    <Switch
                                                        colorScheme="teal" 
                                                        isChecked={switchStates[2]}
                                                        name='2'
                                                        onChange={handleSwitchChange}
                                                    />
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Board
