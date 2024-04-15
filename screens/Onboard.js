import { Alert, StatusBar, Image } from 'react-native';
import React from 'react';

import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import MaterialIcons from 'react-native-vector-icons';

//onboarding page to welcome first time users and give them a introduction of what the app is for
const Onboard = ({route, navigation}) => {

  return(
  <Onboarding
    showDone={false}
    onSkip={() => navigation.navigate('Login')}
    //stores the data in pages array, and each object is for a different page
    //the properties are title, subtitile, background color, and an image
    pages={[
      {
        title: 'Welcome to Treasure!',
        subtitle: 'At Treasure, we collect, wash, sort, organize, and send your donations to charities of your choice.',
        backgroundColor: '#77BC3F',
        image: (
          <Image
          style={{width: 150, height: 140}}
          source={require('../images/logo.jpeg')}
        />
        ),
      },
      {
        title: 'Track Donations',
        subtitle: 'You can track your donation from the moment its picked up until it reaches the receivers.',
        backgroundColor: '#77BC3F',
        image: (
          <Icon
            name="truck"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Select a cause you want to support',
        subtitle: 'There are multiple charities to choose from to make donations to.',
        backgroundColor: '#77BC3F',
        image: (
          <Icon name="heart" type="font-awesome" size={100} color="white" />
        ),
      },
      {
        //this button takes you to the login page 
        title: "Are You Ready?",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={() => {
              navigation.navigate('Login');
              StatusBar.setBarStyle('default');
            }}
          />
        ),
        backgroundColor: '#77BC3F',
        image: (
                    <Image
          style={{width: 150, height: 140}}
          source={require('../images/logo.jpeg')}
        />
        ),
      },
    ]}
  />
  )
  };

export default Onboard;
