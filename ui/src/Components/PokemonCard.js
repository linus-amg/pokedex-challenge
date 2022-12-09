import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { SPRITE_URL } from '../utils';

const legendaryGradient = 'linear(to-br, yellow.50, yellow.200)';
const commonGradient = 'linear(to-br, gray.50, white)';

function PokemonCard({ pokemon }) {
  const bgGradient = pokemon.legendary ? legendaryGradient : commonGradient;

  return (
    <GridItem>
      <Link to={`/detail/${pokemon.id}`}>
        <Card bgGradient={bgGradient}>
          <CardHeader>
            <Text maxWidth="100%" noOfLines={1}>
              {pokemon.name}
            </Text>
          </CardHeader>
          <CardBody>
            <Flex justify="center" height={140}>
              <Image
                height={24}
                src={`${SPRITE_URL}${pokemon.original_id}.png`}
              />
            </Flex>
            <Flex justify="space-between" p={0}>
              <Text>#{pokemon.original_id}</Text>
              <Text fontSize={16}>
                {pokemon.type1} {pokemon.type2 && '&'} {pokemon.type2}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Link>
    </GridItem>
  );
}

export default PokemonCard;
