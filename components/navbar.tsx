import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useBreakpointValue,
    WrapItem,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const displayMenu = useBreakpointValue({ base: 'none', md: 'flex' })
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <Box p='4'>
            <Flex alignItems='center' justifyContent='space-between'>
                <WrapItem as={NextLink} href='/'>
                    <Avatar bg='#575CFE' color='white' name='Hydrinvest' size='sm' />
                </WrapItem>

                <Flex display={displayMenu} gap='10'>
                    <Button as={NextLink} href='/' variant='ghost'>
                        Home
                    </Button>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                            Assets
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href='bob'>Invest</MenuItem>
                            <MenuItem as={NextLink} href='bob'>Learn</MenuItem>
                            <MenuItem as={NextLink} href='bob'>Tips</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                            Account
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href='bob'>Board</MenuItem>
                            <MenuItem as={NextLink} href='bob'>Profil</MenuItem>
                            <MenuItem as={NextLink} href='bob'>Settings</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Flex display={displayMenu}>
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
                    <Link href="#" mb='2'>
                        Home
                    </Link>
                    <Text mb='2'>
                        Assets
                    </Text>
                    <Flex direction='column' ml={4}>
                        <Link href="#" mb='2'>
                            Invest
                        </Link>
                        <Link href="#" mb='2'>
                            Learn
                        </Link>
                        <Link href="#" mb='2'>
                            Tips
                        </Link>
                    </Flex>
                    <Text mb='2'>Account</Text>
                    <Flex direction='column' ml={4}>
                        <Link href="#" mb='2'>
                            Board
                        </Link>
                        <Link href="#" mb='2'>
                            Profil
                        </Link>
                        <Link href="#" mb='2'>
                            Settings
                        </Link>
                    </Flex>
                    <Divider mb='6' mt='4' />
                    <ConnectButton /> 
                </Flex>
            </Flex>
        </Box>
    )
}

export default Navbar
