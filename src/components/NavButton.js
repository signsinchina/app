/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default class NavButton extends Component {
  render() {
    const {onPress, secondary, selected, title} = this.props
    return (
      <Button
        onPress={onPress ? onPress : null}
        containerViewStyle={[styles.btnContainerView, secondary && styles.secondaryContainer]}
        buttonStyle={[styles.button, secondary && styles.secondaryBtn, !secondary && selected && styles.selectedBtn]}
        textStyle={styles.text}
        borderRadius={4}
        color={secondary ? (selected ? 'black' : 'gray') : (selected ? 'white' : 'black')}
        title={title}/>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40 - 4,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  secondaryBtn: {
    height: 30,
    borderWidth: 0,
  },
  selectedBtn: {
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'black',
  },
  secondaryContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 5,
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
