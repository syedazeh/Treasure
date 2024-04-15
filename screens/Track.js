// Show Timeline using React Native Timeline ListView
// https://aboutreact.com/react-native-timeline-listview/
 
// import React in our code
import React, { useEffect, useState } from 'react';
 
// import all the components we are going to use
import {StyleSheet, Text, View, Image, Modal} from 'react-native';
 
// import Timeline
import Timeline from 'react-native-timeline-flatlist';

//firebase
import {getDocs, query, where, collection} from "firebase/firestore";

//THIS PAGE IS FOR TRACKING ORDER
//USERS CAN SEE THE PROGRESS OF THEIR DONATION ALL THE WAY FROM PICKUP FROM THEIR HOUSE TO DROP OFF TO RECEIVERS
 
const Track = ({route, navigation}) => {

  //set variables to use in setInterval
  const [first, setFirst] = useState(false)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fourth, setFourth] = useState(false)
  const [fifth, setFifth] = useState(false)
  const [sixth, setSixth] = useState(false)

  //setInterval for variables in interval of 3 seconds and then use it in use effect so that it displays as soon as the page is opened
  useEffect(() => {
    setInterval(() => {
      setFirst(true)
    }, 3000)
    setInterval(() => {
      setSecond(true)
    }, 6000)
    setInterval(() => {
      setThird(true)
    }, 9000)
    setInterval(() => {
      setFourth(true)
    }, 12000)
    setInterval(() => {
      setFifth(true)
    }, 15000)
    setInterval(() => {
      setSixth(true)
    }, 18000)
  }, [])

  //data for list view
  const data = [
    //if first true then reveal this data
    first &&
    {
      time: '09:00', 
      title: 'Donation Picked Up From Your House', 
      description: 'Thank you for your donation. We will ensure it reaches the intended receivers safely.',
      lineColor:'#009688', 
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://image.shutterstock.com/image-photo/clothing-bag-donation-260nw-42238615.jpg'
    },
    second &&
    {
      time: '10:45', 
      title: 'Donation Dropped Off At Laundry', 
      description: 'The donation has been dropped off at a partnered responsible laundry service for cleaning, sorting, and packaging.', 
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://image.shutterstock.com/image-photo/clothing-bag-donation-260nw-42238615.jpg'
    },
    third &&
    {
      time: '12:00', 
      title: 'Donation Collected From Laundry After Cleaning Service', 
      description: 'The donation has been cleaned, sorted, and packaged and is ready to collect.',
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://i.pinimg.com/564x/76/5d/6d/765d6dbde8510c3d163785e0ea71a60c.jpg'
    },
    fourth &&
    {
      time: '14:00', 
      title: 'Donation Dropped Off At Charity Of Your Choice', 
      description: 'The donation has been successfully dropped off to the charity you chose and received by them.',
      lineColor:'#009688', 
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://m.gulf-times.com/Content/Upload/Editor/Image1_520205194138619546318.png'
    },
    fifth &&
    {
      time: '16:30', 
      title: 'Donation Shipped To Country From Charity', 
      description: 'The donation has been successfully shipped to be delivered to the people you are helping : )', 
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://www.marineinsight.com/wp-content/uploads/2021/05/8-Major-Types-of-Cargo-Transported-Through-the-Shipping-Industry.png'
    },
    sixth &&
    {
      time: '16:30', 
      title: 'Donation Received by Receivers', 
      description: 'The donation has been successfully been received by the people you have helped : )', 
      icon: require('../images/logo.jpeg'),
      imageUrl: 'https://stepsfoundationnepalblog.files.wordpress.com/2017/07/clothes-donation-4.jpg'
    }
  ];
 
  const renderDetail = (rowData, sectionID, rowID) => {
    let title =
      <Text style={[styles.rowTitle]}>
        {rowData.title}
      </Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescriptionStyle]}>
            {rowData.description}
          </Text>
          <Image
            source={{uri: rowData.imageUrl}}
            style={styles.imageStyle}
          />
        </View>
      );
    return (
      <View style={{flex: 1}}>
        {title}
        {desc}
      </View>
    );
  };
 
  //timeline
  return (
    <View style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center', flex: 1}}>
      <Text style={styles.title}>
        Track Your Donation
      </Text>
      <Text style={{alignSelf: 'center'}}>Order No: {route.params.trackID}</Text>
      {/* tracking timeline of order */}
      <Timeline
        data={data}
        circleSize={20}
        circleColor="rgba(0,0,0,0)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{minWidth: 52, marginTop: -5}}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#77BC3F',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        //text style for description
        descriptionStyle={{color: 'gray'}}
        options={{
          style: {paddingTop: 5},
        }}
        innerCircle={'icon'}
        onEventPress={(item) =>
          //alerts message of event with time
          alert(`${item.title} at ${item.time}`)
        }
        renderDetail={renderDetail}
        separator={false}
        detailContainerStyle={{
          marginBottom: 20,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: '#BBDAFF',
          borderRadius: 10,
        }}
        //formatting the timeline to left side
        columnFormat="single-column-left"
      />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    //flexDirection: 'row',
    paddingRight: 50,
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf:'center',
    marginTop: 10
    //borderRadius: 25,
  },
  textDescriptionStyle: {
    marginLeft: 10,
    color: 'gray',
  },
});
 
export default Track;
