import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const useIsAccountConnected = () => {
    const { isConnected } = useAccount()
    const [isAccountConnected, setIsAccountConnected] = useState(false)

    useEffect(() => {
        setIsAccountConnected(isConnected)

        return () => {
            setIsAccountConnected(false)
        }
    }, [isConnected])

    return isAccountConnected
}

export default useIsAccountConnected
