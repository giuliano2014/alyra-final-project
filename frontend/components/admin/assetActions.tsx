import { financialVehicleContractAddress } from "@/contracts/financialVehicle"
import {
    Box,
    Button,
    Card,
    Heading,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"
import { FC } from "react"

import { FormattedAsset } from "@/components/admin/adminBoard.types"

type AssetMetricsProps = {
    assets: FormattedAsset[]
    endSellingSession: (assetAddress: string) => void
    getBalance: (assetAddress: string, financialVehicleAddress: string) => void
    isLoadingEndSellingSessions: Record<string, boolean>
    isLoadingStartSellingSessions: Record<string, boolean>
    startSellingSession: (assetAddress: string) => void
}

const AssetActions: FC<AssetMetricsProps> = ({
    assets,
    endSellingSession,
    getBalance,
    isLoadingEndSellingSessions,
    isLoadingStartSellingSessions,
    startSellingSession
}) => {
    return (
        <Box mt='10'>
            <Heading size='md'>Actions sur les actifs</Heading>
            <Card borderRadius='2xl' mt='4'>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>{assets.length > 0 ? "Actions sur les actifs " : "Aucun actif n'a été créé pour le moment"}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Address</Th>
                                <Th>Nom</Th>
                                <Th>Démarrer la vente</Th>
                                <Th>Clôturer la vente</Th>
                                <Th>Balance</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {assets.length > 0 && assets.map(({ assetAddress, name }) => {
                                return (
                                    <Tr key={`actions-${assetAddress}`}>
                                        <Td>{assetAddress}</Td>
                                        <Td>{name}</Td>
                                        <Td>
                                            <Button
                                                colorScheme='teal'
                                                isDisabled={isLoadingStartSellingSessions[assetAddress]}
                                                onClick={() => startSellingSession(assetAddress)}
                                                size='xs'
                                            >
                                                Commencer
                                            </Button>
                                        </Td>
                                        <Td>
                                            <Button
                                                colorScheme='red'
                                                isDisabled={isLoadingEndSellingSessions[assetAddress]}
                                                onClick={() => endSellingSession(assetAddress)}
                                                size='xs'
                                            >
                                                Terminer
                                            </Button>
                                        </Td>
                                        <Td>
                                            <Button
                                                colorScheme='blue'
                                                onClick={() => getBalance(assetAddress, financialVehicleContractAddress || '')}
                                                size='xs'
                                            >
                                                Consulter
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default AssetActions