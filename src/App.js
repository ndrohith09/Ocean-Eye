import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Nav } from './components/nav';
import { Home } from './components/home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Home />  
    </ChakraProvider>
  );
}

export default App;
