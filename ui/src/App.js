import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import PokemonCardsGrid from './Components/PokemonCardsGrid';
import PokemonDetail from './Components/PokemonDetail';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="gray.100">
        <Grid minH="100vh" p={3}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PokemonCardsGrid />} />
              <Route path="/detail/:pokemonId" element={<PokemonDetail />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Box>

    </ChakraProvider>
  );
}

export default App;
