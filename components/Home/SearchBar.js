import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function SearchBar({searchedLocation}) {
    
  return (
    <View style={styles.container}>
        <Ionicons name='location-sharp' size={24} style={{paddingTop: 10, paddingLeft: 8}}/>
        <GooglePlacesAutocomplete
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                searchedLocation(details?.geometry.location)
            }}
            query={{
                key: 'AIzaSyDhZk3aNWqPsura-sGhm6SBfqHQOQ39i-0',
                language: 'en',
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15,
        paddingHorizontal: 5,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
    }
})