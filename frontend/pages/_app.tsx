import { ChakraProvider } from '@chakra-ui/react'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import Layout from '@/components/layout'
import { chains, wagmiClient } from '@/libs/rainbowkit.config'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider 
                chains={chains}
                theme={lightTheme({
                    accentColor: '#575CFE',
                })}
            >
                <ChakraProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default App
