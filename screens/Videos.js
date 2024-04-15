//https://docs.expo.dev/versions/latest/sdk/video/


import * as React from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useState, useEffect, useRef } from "react";
import { Text } from 'react-native-paper';

//displays videos
const Videos = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <ScrollView contentContainerStyle={{ height: 1300 }}>
      <Text variant="headlineLarge" style={{ margin: 20, alignSelf: 'center' }}>See How You Have Helped Them</Text>
    <View style={styles.container}>

        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://media.istockphoto.com/id/1292036457/video/mother-son-volunteering-at-a-food-bank.mp4?s=mp4-640x640-is&k=20&c=s-_f8Bn78DrlZuVWQDbnBuDfNV8lk-a0tYQUWqd5hRY=',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://media.istockphoto.com/id/1217871379/video/portrait-of-multi-cultural-children-hanging-out-with-friends-in-countryside-together.mp4?s=mp4-640x640-is&k=20&c=EAF0iwvLpMP5YIwtWc5V5hg90Ccp3efoiV18M5fmn2s=',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
                <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://media.istockphoto.com/id/1196860367/video/mid-adult-volunteer-coordinator-hands-supplies-to-volunteers-during-cleanup-event.mp4?s=mp4-640x640-is&k=20&c=rX73bPCM__iOCDBnkQv077pkwXzy2Uy9WFLBK3KCcZM=',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
                <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://media.istockphoto.com/id/1288509820/video/people-in-need-recieving-food-donation-box-from-a-volunteer.mp4?s=mp4-640x640-is&k=20&c=cefcMMNewxvxODR_jtJvrhworA6ALTXc2jc1gtxaLEk=',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        {/* <View style={styles.buttons}> */}
        {/* <View>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    
    </View>
    </ScrollView>
  )
}

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    width: '90%',
    height: 200,
    borderRadius: 50 / 2,
    //borderWidth: 1,
    margin: 20
  }
})