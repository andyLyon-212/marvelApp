import React from 'react'
import {
  NativeBaseProvider,
  Center,
  Box,
  HStack,
  Stack,
  VStack,
  extendTheme,
  View,
} from 'native-base'
import DashboardTable from './components/DashboardTable'
import DashboardTitle from './components/AppBar'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

export const App = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Box flex={{ base: 1, md: 3 }} bg="blueGray.50">
        <VStack>
          <DashboardTitle />
          <VStack>
            <DashboardTable />
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  )
}
export default App
