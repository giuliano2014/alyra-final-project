import { ChevronDownIcon, CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    WrapItem
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import React, { useState } from 'react'

import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Navbar = () => {
    const isAccountConnected = useIsAccountConnected()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)


    // const { address, connector, isConnected, isReconnecting, isDisconnected } = useAccount({
    //     onConnect: () => {
    //         console.log('onConnect isConnected', isConnected)
    //         console.log('onConnect isDisconnected', isDisconnected)
    //         console.log('onConnect isReconnecting', isReconnecting)
    //     },
    //     onDisconnect: () => {
    //         console.log('onDisconnect isConnected', isConnected)
    //         console.log('onDisconnect isDisconnected', isDisconnected)
    //         console.log('onDisconnect isReconnecting', isReconnecting)
    //     }
    // })

    const handleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <Container bg='white' maxW='container.xxl' position='fixed' zIndex='1'>
            <Box p='4'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' justifyContent='space-between' gap={{ base: '5', md: '10' }}>
                        <WrapItem as={NextLink} href='/'>
                            <Avatar bg='#575CFE' color='white' name='Hydrinvest' size='sm' />
                        </WrapItem>
                        <IconButton
                            aria-label='Menu'
                            display={{ base: 'flex', md: 'none' }}
                            icon={isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                            onClick={handleMobileMenu}
                        />
                        <Flex display={{ base: 'none', md: 'flex' }} gap='10'>
                            <Button as={NextLink} href='/' variant='ghost'>
                                Accueil
                            </Button>
                            <Button as={NextLink} href='/assets' variant='ghost'>
                                Actifs
                            </Button>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                                    À propos
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={NextLink} href='/about/team'>L&apos;équipe</MenuItem>
                                    <MenuItem as={NextLink} href='/about/manifest'>Le manifest</MenuItem>
                                    <MenuItem as={NextLink} href='/about/white-paper'>Le white Paper</MenuItem>
                                    <MenuItem as={NextLink} href='/about/help'>Aide</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between' gap='5'>
                        {isAccountConnected && 
                            <Menu>
                                <MenuButton
                                    aria-label='Options'
                                    as={IconButton}
                                    icon={<SettingsIcon />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem as={NextLink} href='/account/board'>Tableau de bord</MenuItem>
                                    <MenuItem as={NextLink} href='/account/profil'>Profil</MenuItem>
                                    <MenuItem as={NextLink} href='/account/settings'>Paramètres</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                        <ConnectButton
                            accountStatus={{
                                largeScreen: 'full',
                                smallScreen: 'avatar',
                            }}
                            label="Se connecter"
                        />
                    </Flex>
                </Flex>
                <Flex
                    display={isMobileMenuOpen ? 'flex' : 'none'}
                    flexDirection='column'
                    mt='4'
                >
                    <Flex display={{ base: 'flex', md: 'none' }} flexDirection="column" ml='4'>
                        <Link href="/" mb='2'>
                            Accueil
                        </Link>
                        <Link href="/assets" mb='2'>
                            Actifs
                        </Link>
                        <Text mb='2'>
                            À propos
                        </Text>
                        <Flex direction='column' ml={4}>
                            <Link href="/about/team" mb='2'>
                                L&apos;équipe
                            </Link>
                            <Link href="/about/manifest" mb='2'>
                                Le manifest
                            </Link>
                            <Link href="/about/white-paper" mb='2'>
                                Le white Paper
                            </Link>
                            <Link href="/about/help" mb='2'>
                                Aide
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar
