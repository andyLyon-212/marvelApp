import React from 'react'
import {
  NativeBaseProvider,
  Center,
  Box,
  HStack,
  Stack,
  VStack,
  extendTheme,
} from 'native-base'
import DashboardTable from './components/DashboardTable'
import UserProfile from './components/UserProfile'
import DashboardTitle from './components/AppBar'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Center flex={1} p="4">
        <Stack
          m="4"
          w="100%"
          h="100%"
          direction={{ base: 'column', md: 'row' }}
          rounded="xl"
        >
          <Box flex={{ base: 1, md: 3 }} bg="blueGray.50">
            <VStack px="8" my="6" space="6">
              <DashboardTitle />
              <HStack mt="4" space="4">
                <UserProfile />
                <VStack flex={1}>
                  <DashboardTable />
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </Stack>
      </Center>
    </NativeBaseProvider>
  )
}
