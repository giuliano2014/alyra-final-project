import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'

const Home = () => {
    return (
        <>
            <Head>
                <title>Alyra Final Project</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <ConnectButton />
            </main>
        </>
    )
}

export default Home
