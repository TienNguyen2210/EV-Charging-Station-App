import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async() => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logoImage}/>
      <Image source={require('../assets/images/ev-charging.png')} style={styles.bgImage}/>
      <View style={{paddingTop: 20, marginHorizontal: 5}}>
        <Text style={styles.heading}>Your Ultimatea EV Charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging station near you, plan trip and so much more in just one click</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.login}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },

  logoImage: {
    height: 45,
    objectFit: 'contain'
  },

  bgImage: {
    width: '100%',
    height: 250,
    marginTop: 20,
    objectFit: 'cover',
  },

  heading: {
    fontSize: 25,
    fontFamily: 'bold',
    textAlign: 'center',
    marginTop: 30
  },

  desc: {
    fontSize: 17,
    fontFamily: 'regular',
    marginTop: 20, 
    textAlign: 'center',
    color: Colors.GRAY
  },

  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    display: 'flex',
    borderRadius: 99,
    marginTop: 80
  },

  login: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 20,
  }

})