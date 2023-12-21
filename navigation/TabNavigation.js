import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Favorite, Home, Profile } from '../screens';
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Search" component={Home}
            options={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="ios-search" 
                    size={size} 
                    color={color}
                    />
                )
            }}
        />

        <Tab.Screen name="Favorite" component={Favorite}
            options={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarIcon: ({color, size, focused}) => (
                    <Ionicons name= {focused ? "ios-heart" : "ios-heart-outline"} 
                    size={size} 
                    color={color}
                    />
                )
            }}
        />
        
        <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarIcon: ({color, size, focused}) => (
                    <FontAwesome name={ focused ? "user-circle" : "user-circle-o"} 
                    size={size} 
                    color={color}
                    />
                )
            }}
        />
    </Tab.Navigator>
  )
}