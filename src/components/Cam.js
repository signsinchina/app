/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { BlurView, Permissions } from 'expo'

import signBg from '../statics/sign_bg.jpg'

export default class MainBoard extends Component {
  constructor() {
    super()

    this.state = {
      hasCameraPermission: false
    }
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={signBg} style={styles.image}/>
        <BlurView tint="light" intensity={80} style={styles.image}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
})
