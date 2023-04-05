import Head from 'next/head'

import AccountNotConnectedWarning from '@/components/accountNotConnectedWarning'
import AdminBoard from '@/components/admin/adminBoard'
import UserBoard from '@/components/user/userBoard'
import useAdminCheck from '@/hooks/useAdminCheck'
import useIsAccountConnected from '@/hooks/useIsAccountConnected'

const Board = () => {
    const isAdmin = useAdminCheck()
    const isAccountConnected = useIsAccountConnected()

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
