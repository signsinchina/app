/**
 * Created by shu on 24/6/2017.
 */
import React, { Component } from 'react'
import { Font, AppLoading, Location, Permissions } from 'expo'

import Container from './components/Container'
import MainBoard from './components/MainBoard'

import Cam from './components/Cam'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      isReady: false
    }
  }
  componentWillMount() {
    this.loadResourcesAsync()
  }
  async loadResourcesAsync() {
    await Font.loadAsync({
      'din-alternate-regular': require('./statics/DIN-Alternate-Regular.ttf'),
      'din-alternate-bold': require('./statics/DIN-Alternate-Bold.ttf')
    })
    this.setState({isReady: true})
  }
  // async getLocationAsync() {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION)
  //   if (status === 'granted') {
  //     return Location.getCurrentPositionAsync({enableHighAccuracy: true})
  //   } else {
  //     throw new Error('Location permission not granted')
  //   }
  // }
  // async getCameraAsync() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA)
  //   if (status === 'granted') {
  //   } else {
  //     throw new Error('Location permission not granted')
  //   }
  // }
  render() {
    if (!this.state.isReady) {
      return <AppLoading/>
    }

    return (
      <Container>
        <Cam/>
        <MainBoard/>
      </Container>
    )
  }
}
