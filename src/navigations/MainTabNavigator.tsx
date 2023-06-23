import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MapScreen } from '../screens/MapScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { SubmitNavigator } from './ SubmitNavigator';
import { MyPageNavigator } from './MyPageNavigator';
import { RouteNavigator } from './RouteNavigator';
const Tab = createMaterialBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'ホーム',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'マップ',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="bell"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="dummy"
                component={SubmitNavigator}
                options={{
                    tabBarLabel: '投稿',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="plussquareo" color={color} size={26} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('Submit');
                    },
                })}
            />
            <Tab.Screen
                name="Route"
                component={RouteNavigator}
                options={{
                    tabBarLabel: 'ルート一覧',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="route" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPageNavigator}
                options={{
                    title: 'マイページ',
                    tabBarLabel: 'マイページ',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
