import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Platform, Linking } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { db } from '../../Utils/FirebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function PlaceCard({place, isFav, markedFav}) {

    const PLACE_PHOTO_BASE_URL= "https://places.googleapis.com/v1/";

    const {user} = useUser();

    const SetFav = async(place) => {
        await setDoc(doc(db, "ev-fav-place", (place.id).toString()), {
            place: place,
            email: user.primaryEmailAddress?.emailAddress
        });
        markedFav();
    }

    const RemoveFav = async(placeId) => {
        await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
        markedFav();
    }

    const onDirectionClick = async() => {
        const url = Platform.select({
            ios:"maps:"+place?.location?.latitude+","+place?.location?.longtitude+"?q="+place?.formattedAddress,
            android:"geo"+place?.location?.latitude+","+place?.location?.longtitude+"?q="+place?.formattedAddress,
        });
        await Linking.openURL(url)
    }

  return (
    <View style={styles.container}>

        <LinearGradient colors={['transparent','#ffffff', '#ffffff']}>

        {!isFav ? <TouchableOpacity style={styles.icon} onPress={() => SetFav(place)}>
            <Ionicons name='heart-outline' size={30} color='white' />
        </TouchableOpacity> 
        :
        <TouchableOpacity style={styles.icon} onPress={() => RemoveFav(place.id)}>
            <Ionicons name='heart-sharp' size={30} color='red' /> 
        </TouchableOpacity> }


        <Image source={
            place?.photos ?
            {uri: PLACE_PHOTO_BASE_URL+place?.photos[0]?.name+"/media?key="+GlobalApi.API_KEY+"&maxHeightPx=800&maxWidthPx=1200"} : require('../../assets/images/ev-charging.png')}
            style={styles.image}
        />

        <View style={{padding: 10}}>
            <Text style={styles.name}>{place.displayName?.text}</Text>
            <Text style={styles.address}>{place?.shortFormattedAddress}</Text>

            <View style={styles.bottom}>
                <View>
                    <Text style={styles.connector}>Connectors</Text>
                    <Text style={styles.num}>{place?.evChargeOptions?.connectorCount ? place?.evChargeOptions?.connectorCount : "Unknown"} Points </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => onDirectionClick()}>
                        <FontAwesome name='location-arrow' size={24} color="white" />
                </TouchableOpacity>  
            </View>    
        </View>
        
        </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get('screen').width*0.9
    },

    icon: {
        position: 'absolute',
        right: 0,
        margin: 5,
    },

    image: {
        width: '100%',
        borderRadius: 10,
        height: 150,
        zIndex: -1
    },

    name: {
        fontFamily: 'medium',
        fontSize: 23,
    },

    address: {
        color: Colors.GRAY,
        fontFamily: 'regular'
    },

    connector: {
        marginTop: 10,
        fontFamily: 'regular',
        color: Colors.GRAY
    },

    num: {
        fontFamily: 'medium',
        fontSize: 13,
        marginTop: 2
    },

    button: {
        backgroundColor: Colors.PRIMARY, 
        borderRadius: 99, 
        alignItems: "center",
        justifyContent: "center",
        width: 40, 
        height: 40,
        marginTop: 10,
        marginRight: 3
        
    },

    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }  
})