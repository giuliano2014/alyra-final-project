import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

const useAdminCheck = () => {
  const { address } = useAccount()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const adminAddresses = [
      process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_ARNAUD,
      process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GARY,
      process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GIULIANO,
      process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_GIULIANO_LOCALHOST,
      process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_VINCENT
    ]

    setIsAdmin(adminAddresses.includes(address))
  }, [address])

  return isAdmin
}

export default useAdminCheck
