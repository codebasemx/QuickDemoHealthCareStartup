import _ from "lodash"
import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from "@react-native-material/core";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const [ messages, setMessages ] = useState([])
  const [ message, setMessage ]   = useState("")

  const addMessage = () => {
    console.log("DEMO: User created message")
    console.log("MESSAGE: ", message)
    console.log("-----")

    setMessages([ ...messages, { text: message, to: 'someone' } ])
    setMessage("")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e7e3fd' }}>
    
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container }>

        <View style={ styles.messagesContainer }>

          { messages.map(( message, i ) => (

            <View key={ i } style={ styles.messageContainer }>
              <View
                style={{
                  ...styles.message,
                  justifyContent: message.to ? 'flex-end' : 'flex-start'
                }}>
                <Text style={ styles.messageText }>{ message.text }</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={ styles.sendContainer }>

          <TextInput
            value={ message }
            onChangeText={ setMessage } style={ styles.textInput } />

          <TouchableOpacity onPress={ addMessage }>
            <Icon name="send" style={ styles.bell } size={24} color="#3622b1"/>
          </TouchableOpacity>
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
  messagesContainer: {
    padding: 20,
    backgroundColor: 'inherit'
  },
  messageContainer: {
    backgroundColor: 'inherit',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  message: {
    backgroundColor: '#3622b1',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 30,
    width: 200,
    marginBottom: 5,
  },
  messageText: {
    color: 'white',
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
