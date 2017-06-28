/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Image, Animated } from 'react-native'
import { BlurView, Permissions } from 'expo'
import Camera from 'react-native-camera'

import { SCREEN_WIDTH } from '../values'

import signBg from '../statics/sign_bg.jpg'

export default class MainBoard extends Component {
  constructor() {
    super()

    this.state = {
      hasCameraPermission: false,
      displayCam: false,
      cam: false,
      leftAnim: new Animated.Value(-SCREEN_WIDTH),
      captureData: null,
      captureAnim: new Animated.Value(0),
    }

    this.onCapture = this.onCapture.bind(this)
    this.onCaptureRecover = this.onCaptureRecover.bind(this)
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }
  componentDidMount() {
    if (this.props.api) {
      this.props.api.bind('capture', this.onCapture)
      this.props.api.bind('capture-recover', this.onCaptureRecover)
    }
  }
  componentWillUnmount() {
    if (this.props.api) {
      this.props.api.unbind('capture', this.onCapture)
      this.props.api.unbind('capture-recover', this.onCaptureRecover)
    }
  }
  onCaptureRecover() {
    Animated.spring(this.state.captureAnim, {
      toValue: 0,
      tension: 30,
      friction: 10,
    }).start()
    this.setState({
      captureData: null
    })
  }
  onCapture() {
    if (this.camera) {
      const options = {}
      //options.location = ...
      this.camera
        .capture({metadata: options})
        .then(captureData => {
          Animated.spring(this.state.captureAnim, {
            toValue: 1,
            tension: 40,
            friction: 7,
          }).start()
          this.setState({
            captureData
          })
          if (this.props.api) {
            this.props.api.send('capture-end')
          }
        })
        .catch(err => console.error(err))
    }
  }
  shiftRight() {
    setTimeout(() => {
      // open cam after 200ms
      Animated.spring(this.state.leftAnim, {
        toValue: 0,
        tension: 10,
        friction: 7,
      }).start()
    }, 200)
    this.setState({
      displayCam: true,
      cam: true,
    })
  }
  shiftLeft() {
    Animated.spring(this.state.leftAnim, {
      toValue: -SCREEN_WIDTH,
      tension: 10,
      friction: 7,
    }).start()
    setTimeout(() => {
      // close cam after 900ms
      if (!this.state.cam) {
        this.setState({
          displayCam: false
          // never close cam
        })
      }
    }, 900)
    this.setState({
      cam: false,
    })
  }
  componentWillReceiveProps(newProps) {
    if (newProps.mode !== this.props.mode) {
      if (newProps.mode ===  'capture') {
        this.shiftRight()
      } else if (this.props.mode === 'capture') {
        this.shiftLeft()
      }
    }
  }
  render() {
    let {leftAnim, hasCameraPermission, displayCam, captureData, captureAnim} = this.state

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.absolute, {left: -SCREEN_WIDTH}, hasCameraPermission && displayCam && {left: leftAnim}]}>
          <Image source={signBg} style={[styles.absolute, styles.image, {left: SCREEN_WIDTH}]}/>
          {
            hasCameraPermission && displayCam && (
              captureData
                ? <Animated.Image
                    source={{uri: captureData.path}}
                    style={[styles.absolute, { opacity: captureAnim }]}/>
                : <Camera
                    style={styles.absolute}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}/>
            )
          }
        </Animated.View>
      </View>
    )

    // <BlurView tint="light" intensity={80} style={styles.image}/>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  image: {
    // width: '120%',
    // height: '120%',
    // marginLeft: -40,
    // marginTop: -40,
  }
})
