import { Alert, AlertIcon } from "@chakra-ui/react"

const AccountNotConnectedWarning = () => {
    return(
        <Alert status='warning'>
            <AlertIcon />
            Veuillez vous connecter à votre compte pour accéder à cette page
        </Alert>
    )
}

export default AccountNotConnectedWarning
