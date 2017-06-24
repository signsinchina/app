/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements'

import { CARD_MARGIN, CARD_PLACEHOLDERS, CARD_BORDER_RADIUS, BOARD_BORDER_RADIUS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../values'

import SignCard from './SignCard'
import NavButton from './NavButton'
import IndexMenu from './IndexMenu'

export default class CaptureBoard extends Component {
  constructor() {
    super()

    this.state = {
      menuOpened: false,
      modalVisible: false,
      modalData: null,
      touchMove: false
    }
  }
  toggleMenu() {
    this.setState({
      menuOpened: !this.state.menuOpened
    })
  }
  openModal({ image }) {
    this.setState({
      modalVisible: true,
      modalData: {
        image
      }
    })
  }
  closeModal() {
    if (!this.state.touchMove) {
      this.setState({
        modalVisible: false,
        modalData: null
      })
    } else {
      this.setState({
        touchMove: false
      })
    }
  }
  touchCancel() {
    this.setState({
      touchMove: true
    })
  }
  render() {
    const { menuOpened } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IndexMenu open={menuOpened}/>
          <View style={styles.titleContainer}>
            <View style={{flex: 0}}>
              <Text style={styles.title}>PROJECT</Text>
              <Text style={styles.title}>SIGNSINCHINA</Text>
              <View style={styles.bar}/>
            </View>
            <Button containerViewStyle={styles.btnContainerView}
                    buttonStyle={styles.menuIcon}
                    textStyle={{marginRight: 0}}
                    onPress={() => this.toggleMenu()}
                    icon={{name: menuOpened ? 'close' : 'menu', color: 'black', style: {marginRight: 0}}}
                    large={true}/>
          </View>
          <View style={styles.navbar}>
            <View style={styles.navbarModes}>
              <Button containerViewStyle={styles.btnContainerView}
                      textStyle={{marginRight: 0}}
                      buttonStyle={styles.navbarIcon} icon={{name: 'list', color: 'black', style: {marginRight: 0}}}
                      large={true}/>
              <Button containerViewStyle={styles.btnContainerView}
                      buttonStyle={styles.navbarIcon}
                      icon={{name: 'map', color: 'black', style: {marginRight: 0}}}
                      large={true}/>
            </View>
            <View style={styles.navbarBtns}>
              <NavButton title="AREA"/>
              <NavButton title="PROPERTY"/>
              <NavButton title="KIND"/>
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => this.touchCancel()}
          onPressOut={() => this.closeModal()}>
          <ScrollView style={styles.scrollViewContainer}>
            <Text style={styles.searchResultText}>SHOWING "RESULTS"</Text>
            <View style={styles.cardContainer}>
              {
                CARD_PLACEHOLDERS.map((CARD_FILE, index) =>
                  <SignCard
                    key={index}
                    file={CARD_FILE}
                    openModal={(...args) => this.openModal(...args)}
                    closeModal={() => this.closeModal()}/>
                )
              }
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableWithoutFeedback onPressOut={() => this.closeModal()}>
            <View style={styles.popupContainer}>
              {
                this.state.modalData && <View style={styles.popup}>
                  <Image source={this.state.modalData.image} style={styles.popupImage}/>
                </View>
              }
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    borderRadius: BOARD_BORDER_RADIUS,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    borderTopLeftRadius: BOARD_BORDER_RADIUS,
    borderTopRightRadius: BOARD_BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    borderTopWidth: 2,
    borderColor: '#efefef',
  },
  navbarModes: {
    flex: 0,
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    paddingLeft: 25,
    alignItems: 'center',
  },
  navbarBtns: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 50,
  },
  scrollViewContainer: {
    display: 'flex',
    width: '100%',
    padding: CARD_MARGIN / 2,
    marginBottom: 50,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'din-alternate-bold',
  },
  bar: {
    width: 200,
    height: 5,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, .2)'
  },
  btnContainerView: {
    marginLeft: 0,
    marginRight: 0,
  },
  menuIcon: {
    marginTop: 5,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  navbarIcon: {
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  searchResultText: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: 'din-alternate-regular',
  },
  popupContainer: {
    position: 'absolute',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  popup: {
    width: SCREEN_WIDTH - CARD_MARGIN * 6,
    height: SCREEN_WIDTH - CARD_MARGIN * 6,
    borderRadius: CARD_BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 50 },
    backgroundColor: 'white',
    shadowOpacity: 0.9,
    shadowRadius: 200,
  },
  popupImage: {
    width: SCREEN_WIDTH - CARD_MARGIN * 6,
    height: SCREEN_WIDTH - CARD_MARGIN * 6,
    borderRadius: CARD_BORDER_RADIUS,
    // borderTopLeftRadius: CARD_BORDER_RADIUS,
    // borderTopRightRadius: CARD_BORDER_RADIUS,
  }
})
