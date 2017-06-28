/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { CARD_SIZE, CARD_BORDER_RADIUS, CARD_MARGIN, CARD_TITLE_HEIGHT } from '../values'

export default class MainBoard extends Component {
  constructor() {
    super()
    this.state = {
      pressTS: 0,
    }
  }
  pressIn() {
    this.setState({
      pressTS: Date.now(),
    })
  }
  render() {
    const {file, title} = this.props
    return (
      <View>
        <TouchableOpacity
          delayPressIn={200}
          delayPressOut={10}
          onPress={() => {
            this.props.openModal({image: this.props.file.high})
          }}
          onPressIn={() => {
            this.pressIn()
            this.props.openModal({image: this.props.file.high})
          }}
          onPressOut={() => {
            if (Date.now() - this.state.pressTS < 500) {
              return
            }
            this.props.closeModal()
          }}>
          <View style={styles.container}>
            <Image source={file.low} style={styles.image}/>
            <Text style={styles.title}>{title || 'TITLE'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: CARD_SIZE,
    height: CARD_SIZE + CARD_TITLE_HEIGHT,
    margin: CARD_MARGIN / 2,
  },
  image: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: CARD_BORDER_RADIUS,
  },
  title: {
    margin: 10,
    fontSize: 10,
    fontFamily: 'din-alternate-regular',
  }
})
