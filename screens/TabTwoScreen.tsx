import { useContext, useEffect } from "react"
import { ScrollView, StyleSheet } from 'react-native';

import { useIsFocused } from '@react-navigation/native'
import { Text, View } from '../components/Themed'

import EditScreenInfo from '../components/EditScreenInfo'
import { ThemeContext } from "../contexts"

const HABITS = [ 1,2,3 ]

export default function TabTwoScreen() {

  const { switchTheme } = useContext(ThemeContext)
  const isFocused       = useIsFocused()

  useEffect(() => {

    //TODO: Switch the theme based on focus...
    if ( isFocused ) {
      /* switchTheme('dark') */
    }

  }, [ isFocused ])

  return (
    <ScrollView contentContainerStyle={ styles.container }>

      { HABITS.map( (h, i) => {
        return (
          <View key={ i } style={ styles.activityRow }>
            <View style={ styles.activity }/>
            <View style={ styles.activity }/>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'inherit'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: 60,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'inherit'
  },
  activity: {
    width: 150,
    height: 150,
    borderWidth: 7,
    borderColor: "#3622b1",
    backgroundColor: "inherit",
    borderRadius: 75,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
