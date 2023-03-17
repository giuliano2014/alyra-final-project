import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiClient } from '../libraries/rainbowkit.config'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default App
