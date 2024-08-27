import { View, Text } from 'react-native'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='home'/>
      <Tabs.Screen name='muscle'/>
      <Tabs.Screen name='exercise'/>
    </Tabs>
  )
}