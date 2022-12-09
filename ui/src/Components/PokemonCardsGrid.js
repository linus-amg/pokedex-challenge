
import { Grid, Text, VStack } from '@chakra-ui/react';
import useAPI from '../hooks/use-api';
import PokemonCard from './PokemonCard';

function PokemonCardsGrid() {
  const { data, isLoading, error, isEmpty } = useAPI('/api/pokemons');

  if (isLoading) {
    return <VStack><Text>loading</Text></VStack>
  }

  if (error || isEmpty) {
    return <VStack><Text>There has been an issue while retrieving the list of Pokemons.</Text></VStack>
  }

  return <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)',  lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }} gap={10} p={6}>
    {data.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
</Grid>
}

export default PokemonCardsGrid;