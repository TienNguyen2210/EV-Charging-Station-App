import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { db } from '../Utils/FirebaseConfig'
import PlaceCard from '../components/Home/PlaceCard'
import { useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Favorite() {

  const [favList, setFavList] = useState([])
  const {user} = useUser();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user&&getFav();
  }, [user])


  const getFav = async() => {
    setLoading(true)
    setFavList([])
    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavList(favList => [...favList, doc.data()])
      setLoading(false)
    });
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}> My Favorite <Text style={{color: Colors.PRIMARY}}>Place</Text> </Text>
      {!favList ? <View style={styles.container}>
        <ActivityIndicator 
          size={'large'}
          color={Colors.PRIMARY}
        />
        <Text style={{marginTop: 10}}>Loading...</Text>
      </View> : null }

      <FlatList  
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({item, index}) => (
          <PlaceCard place={item.place} isFav={true} markedFav={() => getFav()} />
        )}

      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontFamily: 'medium',
    fontSize: 25
  },

  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})