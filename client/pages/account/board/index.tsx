import {
    Badge,
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
    Tr,
    Switch,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import Head from 'next/head'
import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useAccount } from 'wagmi'

const Board = () => {
    const [assetName, setAssetName] = useState('')
    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
    const isAssetNameError = assetName === ''

    const handleInputAssetNameChange = (e: ChangeEvent<HTMLInputElement>): void => setAssetName(e.target.value)

    const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        setSwitchStates({
            ...switchStates,
            [event.target.name]: event.target.checked
        })
    }

    const { address, connector, isConnected, isReconnecting, isDisconnected } = useAccount({
        onConnect: () => {
            // console.log('onConnect isConnected', isConnected)
            // console.log('onConnect isConnected', isConnected)
            // console.log('onConnect isReconnecting', isReconnecting)
            sessionStorage.setItem("isConnected", 'true');
        },
        onDisconnect: () => {
            // console.log('onDisconnect isConnected', isConnected)
            // console.log('onDisconnect isDisconnected', isDisconnected)
            // console.log('onDisconnect isReconnecting', isReconnecting)
            sessionStorage.setItem("isConnected", 'false');
        },
})

if (!isConnected) {
    return (
        // <Box pb='4' pl='4' pr='4' pt='20'>
        //         <Container maxW='container.lg'>
        // <Alert status='warning' width="50%">
        //             <AlertIcon />
        //             Please, connect your Wallet!
        //         </Alert>
        //         </Container>
        // </Box>
        <Box pb='4' pl='4' pr='4' pt='20'>

        <Container maxW='container.lg'>

        <Alert status='warning'>
    <AlertIcon />
    Please, connect your Wallet!
  </Alert>
        </Container>
        </Box>
    )
  }
  
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
                                            <Button colorScheme='teal' mt='4' type='submit'>Add</Button>
                                        </FormControl>
                                    </Stack>
                                </Card>
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
                </Container>
            </Box>
        </>
    )
}

export default Board
