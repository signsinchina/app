/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default class NavButton extends Component {
  render() {
    return (
      <Button
        containerViewStyle={styles.btnContainerView}
        buttonStyle={styles.button}
        textStyle={styles.text}
        borderRadius={4}
        color='black'
        title={this.props.title}/>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40 - 4,
    borderWidth: 2,
    borderColor: '#efefef',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  btnContainerView: {
    marginLeft: 0,
    marginRight: 8,
    margin: 5,
  },
  text: {
    marginRight: 0,
    fontSize: 12,
    fontFamily: 'din-alternate-bold',
  }
})
