// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// npm install @react-navigation/stack
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incident from './pages/Incidents'
import Detail from './pages/Detail'

export default function Routes() {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name='Incidents' component={Incident} />
        <AppStack.Screen name='Detail' component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}