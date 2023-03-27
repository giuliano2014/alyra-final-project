import { Alert, AlertIcon } from "@chakra-ui/react"

const AccountNotConnectedWarning = () => {
    return(
        <Alert status='warning'>
            <AlertIcon />
            Veuillez connecter votre portefeuille !
        </Alert>
    )
}

export default AccountNotConnectedWarning
