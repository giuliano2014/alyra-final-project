import { ChevronDownIcon, CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
    WrapItem,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'

const Navbar = () => {
    const displayMenu = useBreakpointValue({ base: 'none', md: 'flex' })
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
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

    return (
        <Container maxW='container.xxl'>
        <Box p='4'>
            <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' justifyContent='space-between' gap='10'>
                <WrapItem as={NextLink} href='/'>
                    <Avatar bg='#575CFE' color='white' name='Hydrinvest' size='sm' />
                </WrapItem>

                {/* <Flex display={displayMenu} gap='10'> */}
                    <Button as={NextLink} href='/' variant='ghost'>
                        Home
                    </Button>
                    <Button as={NextLink} href='/assets' variant='ghost'>
                        Assets
                    </Button>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                            About
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href='/about/team'>Team</MenuItem>
                            <MenuItem as={NextLink} href='/about/manifest'>Manifest</MenuItem>
                            <MenuItem as={NextLink} href='/about/white-paper'>White Paper</MenuItem>
                            <MenuItem as={NextLink} href='/about/help'>Help</MenuItem>
                        </MenuList>
                    </Menu>
                    {/* {isConnected && 
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                                Account
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={NextLink} href='/account/board'>Board</MenuItem>
                                <MenuItem as={NextLink} href='/account/profil'>Profil</MenuItem>
                                <MenuItem as={NextLink} href='/account/settings'>Settings</MenuItem>
                            </MenuList>
                        </Menu>
                    } */}
                    {/* <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                            Test
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href='/test/set'>Set a number</MenuItem>
                            <MenuItem as={NextLink} href='/test/get'>Get the number</MenuItem>
                        </MenuList>
                    </Menu> */}
                {/* </Flex> */}

                </Flex>

                <Flex alignItems='center' display={displayMenu} justifyContent='space-between' gap='5'>
                    {isConnected && 
                        <Menu>
                            <MenuButton
                                aria-label='Options'
                                as={IconButton}
                                icon={<SettingsIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem as={NextLink} href='/account/board'>Board</MenuItem>
                                <MenuItem as={NextLink} href='/account/profil'>Profil</MenuItem>
                                <MenuItem as={NextLink} href='/account/settings'>Settings</MenuItem>
                            </MenuList>
                        </Menu>
                    }
                    <ConnectButton /> 
                </Flex>

                <IconButton
                    aria-label='Menu'
                    display={{ base: 'flex', md: 'none' }}
                    icon={isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={handleMobileMenu}
                />
            </Flex>

            <Flex
                display={isMobileMenuOpen ? 'flex' : 'none'}
                flexDirection='column'
                mt='4'
            >
                <Flex display={{ base: 'flex', md: 'none' }} flexDirection="column" ml='4'>
                    <Link href="/" mb='2'>
                        Home
                    </Link>
                    <Link href="/assets" mb='2'>
                        Assets
                    </Link>
                    <Text mb='2'>
                        About
                    </Text>
                    <Flex direction='column' ml={4}>
                        <Link href="/about/team" mb='2'>
                            Team
                        </Link>
                        <Link href="/about/manifest" mb='2'>
                            Manifest
                        </Link>
                        <Link href="/about/white-paper" mb='2'>
                            White Paper
                        </Link>
                        <Link href="/about/help" mb='2'>
                            Help
                        </Link>
                    </Flex>
                    <Text mb='2'>Account</Text>
                    <Flex direction='column' ml={4}>
                        <Link href="/account/board" mb='2'>
                            Board
                        </Link>
                        <Link href="/account/profil" mb='2'>
                            Profil
                        </Link>
                        <Link href="/account/settings" mb='2'>
                            Settings
                        </Link>
                    </Flex>
                    <Text mb='2'>Test</Text>
                    <Flex direction='column' ml={4}>
                        <Link href="/test/set" mb='2'>
                            Set a number
                        </Link>
                        <Link href="/test/get" mb='2'>
                            Get the number
                        </Link>
                    </Flex>
                    <Divider mb='6' mt='4' />
                    <ConnectButton /> 
                </Flex>
            </Flex>
        </Box>
        </Container>
    )
}

export default Navbar
