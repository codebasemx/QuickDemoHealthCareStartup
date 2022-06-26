import _ from "lodash"
import { useContext, useEffect } from "react"
import { ScrollView, StyleSheet } from 'react-native';

import { Icon } from "@react-native-material/core";
import { useIsFocused } from '@react-navigation/native'
import { Text, View } from '../components/Themed'

import EditScreenInfo from '../components/EditScreenInfo'
import { ThemeContext } from "../contexts"

const HABITS = [
  { iconName: "pen"},
  { iconName: "bell"},
  { iconName: "run"},
  { iconName: "yoga"},
  { iconName: "phone"},
  { iconName: "briefcase"},
]

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
    <ScrollView style={{ backgroundColor: "#3622b1" }} contentContainerStyle={ styles.container }>
    
      { _.chunk(HABITS, 2).map( (chunk, i) => {
        return (
          <View key={ i } style={ styles.activityRow }>
            { chunk.map(( activity, i ) => (
                <View key={ i } style={ styles.activity }>
                <Icon name={ activity.iconName } style={ styles.bell } size={50} color="white"/>
                </View>
            )) }
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'inherit',
    backgroundColor: "#3622b1",
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
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 7,
    borderColor: "#3622b1",
    borderColor: "#eee",
    backgroundColor: "inherit",
    borderRadius: 75,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
