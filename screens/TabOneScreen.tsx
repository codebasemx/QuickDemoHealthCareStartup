import { Image, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Icon } from "@react-native-material/core";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import alfieImage from "../assets/images/alfie.png"

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Alfie Demo'>) {
  return (
    <View style={styles.container }>
      <View style={ styles.header }>
        <Icon name="bell" style={ styles.bell } size={24} color="white"/>
        <Text style={styles.greeting }>Hello, Alexander  👋</Text>
        <Text style={styles.headerText}>Your recent prescriptions</Text>

        <View style={ styles.links }>
          <View style={ styles.activeLinkContainer }>
            <Text style={ styles.tabLink }>3 new</Text>
          </View>
          <Text style={styles.tabLink}>2 suggestions</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#3622b1',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 50
  },
  headerText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#eee',
  },
  tabLink: {
    fontWeight: 'bold',
    color: '#eee',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'inherit'
  },
  activeLinkContainer: {
    paddingBottom: 5,
    backgroundColor: 'inherit',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginRight: 10
  },
  activeLink: {
    textDecorationLine: 'underline'
  },
  bell: {
    marginBottom: 25,
  },
  greeting: {
    fontSize: 25,
    color: '#eee',
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
