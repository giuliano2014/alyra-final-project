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

import useAdminCheck from '@/hooks/useAdminCheck'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Navbar = () => {
    const isAdmin = useAdminCheck()
    const isAccountConnected = useIsAccountConnected()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                            <Button as={NextLink} href='/invest' variant='ghost'>
                                Investir
                            </Button>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                                    À propos
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={NextLink} href='/about/team'>L&apos;équipe</MenuItem>
                                    <MenuItem>Le manifest</MenuItem>
                                    <MenuItem>Le white Paper</MenuItem>
                                    <MenuItem>Aide</MenuItem>
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
                                    <MenuItem as={NextLink} href='/account/board'>
                                        {isAdmin ? "Tableau de bord" : "Portefeuille"}
                                    </MenuItem>
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
                        <Link href="/invest" mb='2'>
                            Investir
                        </Link>
                        <Text mb='2'>
                            À propos
                        </Text>
                        <Flex direction='column' ml={4}>
                            <Link href="/about/team" mb='2'>
                                L&apos;équipe
                            </Link>
                            <Link mb='2'>
                                Le manifest
                            </Link>
                            <Link mb='2'>
                                Le white Paper
                            </Link>
                            <Link mb='2'>
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
