import {
    Badge,
    Box,
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
    isLoadingEndSellingSessions: Record<string, boolean>
    isLoadingStartSellingSessions: Record<string, boolean>
}

const AssetMetrics: FC<AssetMetricsProps> = ({
    assets,
    isLoadingEndSellingSessions,
    isLoadingStartSellingSessions
}) => {
    return (
        <Box mt='10'>
            <Heading size='md'>Métriques des actifs</Heading>
            <Card borderRadius='2xl' mt='4'>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>
                            {assets.length > 0 ? "Métriques des actifs" : "Aucun actif n'a été créé pour le moment"}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Adresse</Th>
                                <Th>Nom</Th>
                                <Th>Statut</Th>
                                <Th>Nb total de token</Th>
                                <Th>Symbol du token</Th>
                                <Th>Prix du token</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {assets.length > 0 && assets.map(({ assetAddress, name, symbol, totalSupply }) => {
                                return (
                                    <Tr key={`metrics-${assetAddress}`}>
                                        <Td>{assetAddress}</Td>
                                        <Td>{name}</Td>
                                        <Td>
                                            {!isLoadingStartSellingSessions[assetAddress] && !isLoadingEndSellingSessions[assetAddress] && (
                                                <Badge>Vente non commencée</Badge>
                                            )}
                                            {isLoadingStartSellingSessions[assetAddress] && !isLoadingEndSellingSessions[assetAddress] && (
                                                <Badge colorScheme="green">Vente en cours</Badge>
                                            )}
                                            {isLoadingStartSellingSessions[assetAddress] && isLoadingEndSellingSessions[assetAddress] && (
                                                <Badge colorScheme="red">Vente clôturée</Badge>
                                            )}
                                        </Td>
                                        <Td>{totalSupply}</Td>
                                        <Td>{symbol}</Td>
                                        <Td>1 ETH</Td>
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

export default AssetMetrics