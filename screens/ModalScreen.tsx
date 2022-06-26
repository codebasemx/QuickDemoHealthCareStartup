import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from "@react-native-material/core";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e7e3fd' }}>
    
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container }>

        <View style={ styles.sendContainer }>
          <TextInput style={ styles.textInput } />
          <Icon name="send" style={ styles.bell } size={24} color="white"/>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e3fd',
    justifyContent: 'flex-end'
  },
  sendContainer: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
