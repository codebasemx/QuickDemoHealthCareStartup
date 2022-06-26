import React, { useEffect, useRef, useState } from "react"
import { Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Icon } from "@react-native-material/core";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Snackbar } from "@react-native-material/core";

import alfieImage from "../assets/images/alfie.png"
import phsyicianImg from "../assets/images/hasan.png"

const DUMMY_PRESCRIPTIONS_NEW = [
  { dr: "", drugName: "Vistaril" },
  { dr: "", drugName: "Gabapentin" },
  { dr: "", drugName: "Gadodiamide" },
]

const DUMMY_PRESCRIPTIONS_SUGGESTED = [
  { dr: "", drugName: "Cabometyx" },
  { dr: "", drugName: "Kariva" },
  { dr: "", drugName: "Macrobid" },
  { dr: "", drugName: "Wegovy" },
]

const api = {
  getPrescriptions() {
    return new Promise( resolve => {
      setTimeout(() => {
        resolve({ new: DUMMY_PRESCRIPTIONS_NEW, suggested: DUMMY_PRESCRIPTIONS_SUGGESTED })
      }, 3000)
    })
  }
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Alfie Demo'>) {

  const [ activeLink, setActiveLink ]               = useState(0)
  const [ prescriptionType, setPrescriptionType ]   = useState('new')
  const [ prescriptions, setPrescriptions ]         = useState({ new: [], suggested: [] })
  const [ scrollViewBgColor, setScrollViewBgColor ] = useState(BG_LIGHT)
  const [ isLoadingPrescriptions, setIsLoadingPrescriptions ] = useState(false)
  const [ shouldShowSnackbar, setShouldShowSnackbar ]         = useState(false)

  const sendDrugToCustomer = drugName => {
    console.log(`DEMO: Sending ${ drugName } to customer.`)
    console.log("DEMO: Calling back-end.")

    setShouldShowSnackbar(true)
    setTimeout(() => {
      setShouldShowSnackbar(false)
    }, 3000)
  }

  const confirmSendPrescription = drugName => {
    Alert.alert(
      `Ready to get your ${ drugName } prescription?`,
      "We'll send it to your default address",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => sendDrugToCustomer(drugName) }
      ]
    )
  }

  //Use the useRef hook to prevent multiple setState
  //calls to change the background color based on the scroll position
  const svColor = useRef(BG_LIGHT)

  const onScroll = event => {
    const {
      nativeEvent: {
        contentOffset: {x, y},
        contentSize: {height, width},
      }
    } = event

    //Determine if we need to switch the backgroun color...
    if ( y > 30 && svColor.current === BG_DARK ) {
      svColor.current = BG_LIGHT
      setScrollViewBgColor(BG_LIGHT)
    } else if ( y < 30 && svColor.current === BG_LIGHT ) {
      svColor.current = BG_DARK
      setScrollViewBgColor(BG_DARK)
    }
  }

  //On mount, get a list of prescriptions the
  //user should see for their diet plan...
  useEffect(() => {
    setIsLoadingPrescriptions(true)
    api.getPrescriptions()
    .then(prescriptions => {
      setPrescriptions(prescriptions)

      setIsLoadingPrescriptions(false)
    })

  }, [])

  const onLinkPress = clickedLink => {
    setActiveLink(clickedLink === 'new' ? 0 : 1 )
    setPrescriptionType(clickedLink)
  }

  return (
    <>
      <ScrollView
        onScroll={ onScroll }
        scrollEventThrottle={ 10 }
        style={{ ...styles.containerWrapper, backgroundColor: scrollViewBgColor }}>
        <View style={styles.container}>
          <View style={ styles.header }>
            <Icon name="bell" style={ styles.bell } size={24} color="white"/>
            <Text style={styles.greeting }>Hello, Alexander  👋</Text>
            <Text style={styles.headerText}>Your recent prescriptions</Text>

            <View style={ styles.links }>
              <ActiveLink active={ activeLink === 0 } onPress={ () => onLinkPress('new') }>
                { `${ prescriptions.new.length } new` }
              </ActiveLink>
              <ActiveLink active={ activeLink === 1 } onPress={ () => onLinkPress('suggested') }>
                { `${ prescriptions.suggested.length } suggested` }
              </ActiveLink>
            </View>
          </View>
          { isLoadingPrescriptions === true ?
            <View style={ styles.activityIndicatorContainer }>
              <ActivityIndicator />
            </View>
            :
            <View style={ styles.prescriptionContainer }>
              { prescriptions[ prescriptionType ].map( ( p, k ) => (
                <View key={ k } style={ styles.prescription }>
                  <View style={ styles.prescriptionHeader }>
                    <Text style={ styles.drugName }>{ p.drugName } 250mg</Text>
                    <View style={ styles.badgeContainer }>
                      <Text style={ styles.badgeText }>{ prescriptionType === 'new' ? "NEW" : "SUGGESTED" }</Text>
                    </View>
                  </View>
                  <View style={ styles.physicianContainer }>
                    <Image style={ styles.phsyicianImg } source={ phsyicianImg } />
                    <View style={ styles.phsyicianInfo }>
                      <Text style={ styles.phsyicianName }>Hasan Syed</Text>
                      <Text style={ styles.userActivityText }>3 hours ago</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={ () => confirmSendPrescription(p.drugName) }>
                    <Text style={ styles.sendToPharmacy }>Send to pharmacy near you</Text>
                  </TouchableOpacity>
                </View>
              )) }
            </View>
          }
        </View>
      </ScrollView>
      { shouldShowSnackbar ?
        <Snackbar
        message="Your prescription will arrive within 3 days."
        style={{ position: "absolute", start: 16, end: 16, bottom: 16 }} />
        :
        null
      }
    </>
  );
}

const ActiveLink = ({ active = false, children, onPress }) => {

  return (
    <TouchableOpacity onPress={ onPress }>
      { active ? 
        <View style={ active? styles.activeLinkContainer : styles.inactive }>
          <Text style={ styles.tabLink }>{ children }</Text>
        </View>
        :
        <Text style={ styles.tabLink }>{ children }</Text>
      }
    </TouchableOpacity>
  )
}

const BG_LIGHT  = '#e7e3fd'
const BG_DARK   = '#3622b1'

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    color: 'white',
  },
  container: {
    backgroundColor: "#e7e3fd",
    minHeight: 800
  },
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'inherit',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#3622b1',
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 60,
    borderBottomLeftRadius: 50
  },
  headerText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#eee',
  },
  tabLink: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#eee',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'inherit',
    marginBottom: 20,
  },
  activeLinkContainer: {
    paddingBottom: 5,
    backgroundColor: 'inherit',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginRight: 10
  },
  bell: {
    marginBottom: 25,
  },
  greeting: {
    fontSize: 22,
    color: '#eee',
    marginBottom: 5,
  },
  prescriptionContainer: {
    backgroundColor: 'inherit',
    marginTop: -50
  },
  prescription: {
    backgroundColor: '#fbfbfe',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 100,
    shadowOffset: {
      width: 10,
      height:10 
    },
    shadowOpacity: 0.05,
    shadowRadius: 20
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'inherit',
    justifyContent: 'space-between'
  },
  drugName: {
    color: "#666",
    fontWeight: "bold"
  },
  badgeContainer: {
    backgroundColor: "#c5fff2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  badgeText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 10
  },
  physicianContainer: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
    marginBottom: 10
  },
  phsyicianImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  phsyicianInfo: {
    backgroundColor: 'inherit'
  },
  phsyicianName: {
    color: "#666",
  },
  userActivityText: {
    opacity: 0.3
  },
  sendToPharmacy: {
    color: "#3622b1",
    fontWeight: 'bold'
  }
});
