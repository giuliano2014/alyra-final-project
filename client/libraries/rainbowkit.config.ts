import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { hardhat, localhost } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
    [hardhat],
    [publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'Alyra Final Project',
    chains
})

export const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
})
