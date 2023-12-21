import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppMapView, Header, PlaceView } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/Home/SearchBar'
import { UserLocationContext } from '../Context/UserLocationContext'
import GlobalApi from '../Utils/GlobalApi'
import { SelectMarkerContext } from '../Context/SelectMarkerContext'

export default function Home() {

  const {location, setLocation} = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude,
          },
          "radius": 1000
        }
      }
    }
    GlobalApi.NewNearByPlace(data).then(resp=>{
      console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data?.places);
    })
  }

  useEffect(()=> {
    location && GetNearByPlace();
  }, [location])

  return (
    <SelectMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
      <View>
        <SafeAreaView style={styles.headerContainer}>
          <Header />
          <SearchBar searchedLocation={(location) => setLocation({
            latitude: location.lat,
            longitude: location.lng
          })} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        </SafeAreaView>
        <AppMapView placeList={placeList}/>
        <View style={styles.placeListContainer}> 
          <PlaceView placeList={placeList}/>
        </View>
      </View>
    </SelectMarkerContext.Provider>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
  },

  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  }
})