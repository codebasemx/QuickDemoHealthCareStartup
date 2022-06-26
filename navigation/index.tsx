/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useState } from "react"
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { ThemeContext } from "../contexts"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

const AlfieTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: "#3622b1",
    border: "#3622b1",
  }
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const [ themeVersion, setThemeVersion ] = useState('light')
  const [ theme, setTheme ]               = useState(AlfieTheme)

  const lightTheme = () => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        card: 'white',
        border: 'white'
      }
    }
  }

  const darkTheme = () => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        card: "#3622b1",
        border: "#3622b1",
      }
    }
  }

  const switchTheme = themeVersion => {
    if ( themeVersion === 'light' ) {
      console.log("Switching to light theme")
      setTheme(lightTheme())
    } else {
      console.log("Switching to dark theme")
      setTheme(darkTheme())
    }
  }

  return (
    <ThemeContext.Provider value={{ switchTheme }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Help" component={ModalScreen}  options={{ headerShown: false }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Alfie"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { backgroundColor: 'white', borderWidth: 0, border: 'white' },
        tabBarOptions: { }
      }}>
      <BottomTab.Screen
        name="Alfie"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Alfie'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: "Alfie",
          tabBarLabel: () => null,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Help')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="heart"
                size={20}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Habits',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
