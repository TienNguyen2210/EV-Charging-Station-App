import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({index, place}) {

  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext)

  return (
    <Marker coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}

      onPress={() => setSelectedMarker(index)}  
    >
      <Image source={require('../../assets/images/marker.png')} style={styles.marker}/>
    </Marker>
  )
}

const styles = StyleSheet.create({
  marker: {
    width: 50,
    height: 50,
  }
})