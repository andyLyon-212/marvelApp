import React, { useState, useEffect } from 'react'

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  View,
  NativeBaseProvider,
} from 'native-base'

export const UserProfile = () => {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const url = `http://gateway.marvel.com/v1/public/characters?id=1009610&ts=100&apikey=1c4016f537637fc31f2769525eb6fd0e&hash=3d768cd46eba3edb6492d3cb44883f21`
  useEffect(() => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((response) => {
          setCharacters(response.data.results)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `${characters[0].thumbnail.path}.${characters[0].thumbnail.extension}`.replace(
                    'http',
                    'https'
                  ),
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {characters[0].name}
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                {characters[0].name}
              </Text>
            </Stack>
            <Text fontWeight="400">{characters[0].description}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400"
                >
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      )}
    </View>
  )
}
export default UserProfile
