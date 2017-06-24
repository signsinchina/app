/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class CaptureBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.subtitle}>PROJECT</Text>
          <Text style={styles.subtitle}>SIGNSINCHINA</Text>
        </View>
        <View>
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
    top: 30,
    right: 30,
    bottom: 30 + 50,
    left: 30,
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
