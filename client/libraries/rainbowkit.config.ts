import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { goerli, hardhat, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
    [goerli, hardhat, sepolia],
    [publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'Alyra Final Project',
    chains
})

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})
