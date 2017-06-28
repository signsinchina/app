/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { BlurView } from 'expo'

import { BOARD_MARGIN, TABBAR_HEIGHT, BOARD_BORDER_RADIUS } from '../values'

export default class CaptureBoard extends Component {
  constructor() {
    super()
    this.state = {
      mode: 'capture'
    }

    this.onCaptureEnd = this.onCaptureEnd.bind(this)
    this.onCaptureRecover = this.onCaptureRecover.bind(this)
  }
  componentDidMount() {
    if (this.props.api) {
      this.props.api.bind('capture-end', this.onCaptureEnd)
      this.props.api.bind('capture-recover', this.onCaptureRecover)
    }
  }
  componentWillUnmount() {
    if (this.props.api) {
      this.props.api.unbind('capture-end', this.onCaptureEnd)
      this.props.api.bind('capture-recover', this.onCaptureRecover)
    }
  }
  onCaptureEnd() {
    this.setState({
      mode: 'edit'
    })
  }
  onCaptureRecover() {
    this.setState({
      mode: 'capture'
    })
  }
  render() {
    const {mode} = this.state
    return (
      <View style={[styles.container, mode === 'edit' && {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',
      }]}>
        <View style={[{alignSelf: 'flex-start'}, mode === 'edit' && {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }]}>
          <Text style={styles.subtitle}>PROJECT SIGNSINCHINA</Text>
          <Text style={styles.title}>SIGNAGE CAPTURE</Text>
        </View>
        {
          mode === 'edit' ?
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <BlurView tint='light' intensity={100} style={[styles.buttonContainer, {
                alignSelf: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
              }]}>
                <Button containerViewStyle={styles.btnContainerView}
                        buttonStyle={styles.button}
                        textStyle={styles.btnText}
                        backgroundColor='rgba(0, 0, 0, 0)'
                        icon={{name: 'close', color: 'black', style: {marginRight: 0, fontSize: 20}}}
                        onPress={() => {
                          this.props.api.send('capture-recover')
                        }}
                        large={true}/>
              </BlurView>
              <BlurView tint='light' intensity={100} style={[styles.buttonContainer, {
                alignSelf: 'center',
              }]}>
                <Button containerViewStyle={styles.btnContainerView}
                        buttonStyle={styles.button}
                        textStyle={styles.btnText}
                        backgroundColor='rgba(0, 0, 0, 0)'
                        icon={{name: 'file-upload', color: 'black', style: {marginRight: 0, fontSize: 40}}}
                        onPress={() => {
                          // upload
                        }}
                        large={true}/>
              </BlurView>
              <BlurView tint='light' intensity={100} style={[styles.buttonContainer, {
                alignSelf: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
              }]}>
                <Button containerViewStyle={styles.btnContainerView}
                        buttonStyle={styles.button}
                        textStyle={styles.btnText}
                        backgroundColor='rgba(0, 0, 0, 0)'
                        icon={{name: 'crop', color: 'black', style: {marginRight: 0, fontSize: 20}}}
                        onPress={() => {
                          this.props.api.send('capture-recover')
                        }}
                        large={true}/>
              </BlurView>
            </View>
            :
            <BlurView tint='light' intensity={100} style={[styles.buttonContainer, {alignSelf: 'center'}]}>
              <Button containerViewStyle={styles.btnContainerView}
                      buttonStyle={styles.button}
                      textStyle={styles.btnText}
                      backgroundColor='rgba(0, 0, 0, 0)'
                      icon={{name: 'photo-camera', color: 'black', style: {marginRight: 0, fontSize: 40}}}
                      onPress={() => {
                        this.props.api.send('capture')
                      }}
                      large={true}/>
            </BlurView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    padding: BOARD_MARGIN,
    paddingBottom: BOARD_MARGIN + TABBAR_HEIGHT,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopLeftRadius: BOARD_BORDER_RADIUS,
    borderTopRightRadius: BOARD_BORDER_RADIUS,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'din-alternate-bold',
  },
  title: {
    fontSize: 30,
    fontFamily: 'din-alternate-bold',
  },
  btnContainerView: {
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
})
