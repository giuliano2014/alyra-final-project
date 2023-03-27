import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import AdminBoard from '@/components/admin/adminBoard'
import UserBoard from '@/components/user/userBoard'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Board = () => {
    const { address } = useAccount()
    const isAccountConnected = useIsAccountConnected()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const adminAddressAccount = process.env.NEXT_PUBLIC_HARDHAT_ADMIN_ACCOUNT_0
        setIsAdmin(address === adminAddressAccount)
    }, [address]);
  
    return (
        <>
            <Head>
                <title>HydrInvest - Account Board</title>
                <meta name="description" content="DeFi Dapp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!isAccountConnected && <AccountNotConnectedWarning />}
            {isAccountConnected && !isAdmin && <UserBoard />}
            {isAccountConnected && isAdmin && <AdminBoard />}
        </>
    )
}

export default Board
