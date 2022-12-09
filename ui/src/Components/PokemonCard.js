import { Card, CardBody, CardHeader, Divider, Flex, GridItem, Image, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";

function PokemonCard({ pokemon }) {
  return <GridItem>
    <Card bg="white">
      <CardHeader><Text maxWidth='100%' noOfLines={1}>{pokemon.name}</Text></CardHeader>
      <CardBody>
        <Flex justify="center" height={140}>
          <Image height={24} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.original_id}.png`} />
        </Flex>
        <Flex justify="space-between" p={4}>
          <Text>#{pokemon.original_id}</Text>
          <Text fontSize={16}>{pokemon.type1} {pokemon.type2}</Text>
        </Flex>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td>HP</Td><Td>{pokemon.healthpoints}</Td>
            </Tr>
            <Tr>
              <Td>Attack</Td><Td>{pokemon.attack}</Td>
            </Tr>
            <Tr>
              <Td>Special Attack</Td><Td>{pokemon.special_attack}</Td>
            </Tr>
            <Tr>
              <Td>Defense</Td><Td>{pokemon.defense}</Td>
            </Tr>
            <Tr>
              <Td>Special Defense</Td><Td>{pokemon.special_defense}</Td>
            </Tr>
            <Tr>
              <Td>Speed</Td><Td>{pokemon.speed}</Td>
            </Tr>
            <Tr>
              <Td>Total</Td><Td>{pokemon.total}</Td>
            </Tr>
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  </GridItem>
}

export default PokemonCard;