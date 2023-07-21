import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { ConverterStackProps } from '../../types/converterStack'
import Converter from '../../screens/Converter'
import CountriesList from '../../screens/CountriesList';
import RecentHistory from '../../screens/RecentHistory';
const Stack = createStackNavigator<ConverterStackProps>()



const ConvertStack = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen component={Converter} name="converters" />
            <Stack.Screen component={RecentHistory} name="recentHistory" options={{ presentation: 'modal', animationEnabled: true, gestureEnabled: true, gestureDirection: 'horizontal' }} />
            <Stack.Screen component={CountriesList} name="countryList" options={{ presentation: 'modal', animationEnabled: true, gestureEnabled: true, gestureDirection: 'horizontal' }} />
        </Stack.Navigator>
    )
}

export default ConvertStack;