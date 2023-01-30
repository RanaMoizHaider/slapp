import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import StocksScr from './scr/StocksScr'
import Stocks from './scr/Stocks'
import SingleStockScr from './scr/SingleStockScr'
import FavoritesScr from './scr/FavoritesScr'
import DetailsScr from './scr/DetailsScr'
import ProfileScr from './scr/ProfileScr'
import LoginScr from './scr/LoginScr'
import RegisterScr from './scr/RegisterScr'
import ForgetPassScr from './scr/ForgetPassScr'
import { themeBackground } from "./components/Style"

const StocksStack = createNativeStackNavigator()

function StocksStackScreen() {
  return (
    <StocksStack.Navigator>
      <StocksStack.Screen
        name="Stocks"
        component={Stocks}
        options={() => ({
            title: 'Stocks',
        })}
      />
      <StocksStack.Screen name="SingleStock" component={SingleStockScr} />
    </StocksStack.Navigator>
  )
}

const FavoritesStack = createNativeStackNavigator()

function FavoritesStackScreen() {
    return (
        <FavoritesStack.Navigator>
            <FavoritesStack.Group>
                <FavoritesStack.Screen name="Favorites" component={FavoritesScr} />
                <FavoritesStack.Screen name="Details" component={DetailsScr} />
            </FavoritesStack.Group>
            <FavoritesStack.Group screenOptions={{ presentation: 'modal' }}>
                <FavoritesStack.Screen name="Login" component={LoginScr} />
                <FavoritesStack.Screen name="Register" component={RegisterScr} />
                <FavoritesStack.Screen name="ForgetPass" component={ForgetPassScr} />
            </FavoritesStack.Group>
        </FavoritesStack.Navigator>
    )
}

const ProfileStack = createNativeStackNavigator()

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Group>
                <ProfileStack.Screen name="Profile" component={ProfileScr} />
                <ProfileStack.Screen name="Details" component={DetailsScr} />
            </ProfileStack.Group>
            <ProfileStack.Group screenOptions={{ presentation: 'modal' }}>
                <ProfileStack.Screen name="Login" component={LoginScr} />
                <ProfileStack.Screen name="Register" component={RegisterScr} />
                <ProfileStack.Screen name="ForgetPass" component={ForgetPassScr} />
            </ProfileStack.Group>
        </ProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default function Route() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
            
                        if (route.name === 'Stocks') {
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                        } else if (route.name === 'Favorites') {
                            iconName = focused ? 'ios-star' : 'ios-star-outline'
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }
            
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: themeBackground,
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
            >
                <Tab.Screen name="Stocks" component={StocksStackScreen} />
                <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
                <Tab.Screen name="Profile" component={ProfileStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
