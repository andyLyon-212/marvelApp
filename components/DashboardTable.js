import React, { useState, useEffect } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import UserProfile from './UserProfile'

import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  Input,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const DashboardTable = () => {
  const [mode, setMode] = useState('Basic')
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState('')

  useEffect(async () => {
    const character = await getCharacters()
    const url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=100&apikey=1c4016f537637fc31f2769525eb6fd0e&hash=3d768cd46eba3edb6492d3cb44883f21`
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

  const getCharacters = async () => {
    const response = await AsyncStorage.getItem('character')
    if (!response) {
      return 'spi'
    } else {
      return response
    }
  }

  const fetchData = async (event) => {
    setValue(event.target.value)

    const url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${event.target.value}&ts=100&apikey=1c4016f537637fc31f2769525eb6fd0e&hash=3d768cd46eba3edb6492d3cb44883f21`
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(true)
        setCharacters(response.data.results)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    await AsyncStorage.setItem('character', event.target.value)
  }

  const saveInStorage = async (id) => {
    await AsyncStorage.setItem('characterId', id)
    window.location.reload(false)
  }

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <NativeBaseProvider>
          <HStack mt="4" space="4">
            <UserProfile />
            <Box bg="white" flex="1" safeAreaTop>
              <Heading p="4" pb="3" size="lg">
                Characters
              </Heading>
              <Input
                value={value}
                w={{
                  base: '75%',
                  md: '25%',
                }}
                onChange={(text) => {
                  fetchData(text)
                }}
                placeholder="Character name"
              />
              <Basic
                charactersInformation={characters}
                onChangeCraracter={(id) => {
                  saveInStorage(id)
                }}
              />
            </Box>
          </HStack>
        </NativeBaseProvider>
      )}
    </View>
  )
}

function Basic(props) {
  const data = props.charactersInformation

  const [listData, setListData] = useState(data)
  const [id, setId] = useState('1009610')

  const changeCharacter = (id) => {
    setId(id)
    props.onChangeCraracter(id)
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...listData]
    const prevIndex = listData.findIndex((item) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setListData(newData)
  }

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey)
  }

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable onPress={() => console.log('You touched me')} bg="white">
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`.replace(
                  'http',
                  'https'
                ),
              }}
            />
            <VStack>
              <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                {item.name}
              </Text>
              <Text isTruncated maxW="300" w="80%">
                {item.description}
              </Text>
              <Text
                onPress={() => {
                  changeCharacter(item.id)
                }}
              >
                View Details
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{ color: 'warmGray.50' }}
              alignSelf="flex-start"
            >
              {item.modified}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  )

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  )

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  )
}
export default DashboardTable
