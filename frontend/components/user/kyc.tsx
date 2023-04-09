import { Badge, Box, Button, Card, Heading, Stack } from "@chakra-ui/react"
import { FC, FormEvent } from "react"

type KycProps = {
    askForKycValidation: (e: FormEvent) => void
    status: string
    validated: boolean
}

const Kyc: FC<KycProps>  = ({
    askForKycValidation,
    status,
    validated
}) => {
    return (
        <>
            <Box mt='10'>
                <Heading size='md'>Mon KYC</Heading>
            </Box>
            <Card borderRadius='2xl' mt='4' padding='4'>
                <Box
                    alignItems='center'
                    as='form'
                    display='flex'
                    justifyContent='space-between'
                    onSubmit={askForKycValidation}
                >
                    <Heading size='sm'>Demande de validation de mon KYC</Heading>
                    <Stack direction='row' spacing={4}>
                        {status !== "in progress" && status !== "done" &&
                            <Button
                                size='sm'
                                colorScheme='teal'
                                type='submit'
                                variant='solid'
                            >
                                Validation
                            </Button>
                        }
                        {!validated && status === "in progress" &&
                            <Button
                                size='sm'
                                colorScheme='teal'
                                isLoading={true}
                                loadingText='Demande en cours de traitement'
                                type='submit'
                                variant='solid'
                            >
                                Validation
                            </Button>
                        }
                        {validated && status === "done" && <Badge colorScheme="green">Validé</Badge>}
                        {!validated && status === "done" && <Badge colorScheme="red">Votre KYC a été refusé</Badge>}
                    </Stack>
                </Box>
            </Card>
        </>
    )
}

export default Kyc