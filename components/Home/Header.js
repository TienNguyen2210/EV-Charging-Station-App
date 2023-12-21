import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/user.png')} style={styles.userImg}/>
      <Image source={require('../../assets/images/logo1.png')} style={styles.logo}/>
      <FontAwesome name="filter" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    userImg: {
        width: 35, 
        height: 35, 
        borderRadius: 100,
    },

    logo: {
        width: 200,
        height: 50, 
        objectFit: 'contain'
    }
})