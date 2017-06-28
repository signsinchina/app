/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { BOARD_MARGIN, TABBAR_HEIGHT } from '../values'

export default class CaptureBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.subtitle}>PROJECT</Text>
          <Text style={styles.subtitle}>SIGNSINCHINA</Text>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Text style={styles.title}>AR</Text>
          <Text style={styles.title}>GAMING</Text>
          <Text style={styles.title}>MODE</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: BOARD_MARGIN,
    right: BOARD_MARGIN,
    bottom: BOARD_MARGIN + TABBAR_HEIGHT,
    left: BOARD_MARGIN,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'din-alternate-bold',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'din-alternate-bold',
    textAlign: 'right',
  }
})
