import { Alert, AlertIcon } from "@chakra-ui/react"

const AccountNotConnectedWarning = () => {
    return(
        <Alert status='warning'>
            <AlertIcon />
            Please, connect your Wallet !
        </Alert>
    )
}

export default AccountNotConnectedWarning
