import { StyleSheet, View, Image, Button, Pressable, SafeAreaView, ScrollView } from 'react-native'
import {React, useState, useEffect} from 'react'
import { Text } from 'react-native-paper';
import { db } from "../config";
import { auth } from "../config";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
//this is the charity page where users will see more details about the organization

const Charity = ({ route, navigation }) => {

  const [name, setName] = useState() 
  const [about, setAbout] = useState()
  const [country, setCountry] = useState()
  const [image, setImage] = useState()
  const [desc, setDesc] = useState()

  //get current logged in user
  let user = auth?.currentUser?.email;

  const details = async () => {
    //get current user from orders table in database
    const q = query(collection(db, "orders"), where("email", "==", user));
    const docs = await getDocs(q);
    console.log('docs.empty:',docs.empty)
    
    docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    });

    //if email is present in database navigate to details date time
    if(docs.empty == false){
      console.log('email is present charitySearch')
      navigation.navigate('DetailsDateTime', {name: route.params.name, email: user, country: country})
    }
    //if email is not present in database navigate to details page
    else{
      console.log('email is NOT present charitysearch')
      navigation.navigate('Details', {name: route.params.name, email: user, country: country})
    }
    }
    
    useEffect(() => {
      readAllWhere()
    })

    const readAllWhere = async () => {
      //get charity name from charity table in database where name == charity name passed from previous page
      const q = query(collection(db, "charity"), where("name", "==", route.params.name));
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        //get details and set in variables
        setCountry(doc.data().country)
        setAbout(doc.data().about)
        setImage(doc.data().image)
        setDesc(doc.data().description)
      });
    };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{ height: 800 }}>
    <View style={{ flex: 1, alignItems: 'center' }}>
      
    {/* display charity page */}
      
      <Image
        style={styles.image}
        source={{ uri: image }}
      >
      </Image>
      <View style={styles.box}>
      <Text variant="headlineLarge">Donate to {route.params.name}</Text>
        <Text></Text>
        <Text variant="titleLarge">{desc}</Text>
        <Text></Text>
        <Text style={{fontSize:14}}>{about}</Text>
        <Text></Text>
        <Text style={{fontWeight:'bold'}}>NOTE: </Text>
        <Text>Before we send clothes to the donation organization, we first send them to a laundry service and get your clothes cleaned. Click 'Continue' to proceed.</Text>
        
        <Pressable style={styles.button} onPress={() => details()}>
          <Text style={styles.text}>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Charity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '35%'
  },
  box: {
    marginTop: 20,
    width: '90%',
    height: '50%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    margin: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})