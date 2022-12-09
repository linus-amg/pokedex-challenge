import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Input,
  HStack,
} from '@chakra-ui/react';
import PokemonCardsGrid from './Components/PokemonCardsGrid';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="gray.100">
        <Grid minH="100vh" p={3}>
          <PokemonCardsGrid />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
