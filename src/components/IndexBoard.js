/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements'
import { BlurView } from 'expo'
import _ from 'lodash'

import { CARD_MARGIN, CARD_BORDER_RADIUS, BOARD_BORDER_RADIUS, BOARD_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH, TABBAR_HEIGHT, PIXEL } from '../values'

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
      touchMove: false,
      headerHeight: 0,
      filter: {
        display: 'list',
        type: 'area',
        tag: 'All',
      },
    }

    this.setHeaderHeight = _.debounce(this.setHeaderHeight, 32, false)
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
  changeFilter(display, type, tag) {
    let filter = this.state.filter
    if (display) {
      filter.display = display
    }
    if (type) {
      if (filter.type === type) {
        // toggle this filter
        filter.type = 'all'
      } else {
        filter.type = type
      }
    }
    if (tag) {
      filter.tag = tag
    } else {
      filter.tag = 'All'
    }
    this.setState({ filter })
  }
  touchCancel() {
    this.setState({
      touchMove: true
    })
  }
  setHeaderHeight(headerHeight) {
    // if (!this.state.headerHeight) {
    this.setState({headerHeight})
    // }
  }
  render() {
    const { menuOpened, filter, headerHeight } = this.state
    const { api } = this.props
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={() => this.touchCancel()}
          onPressOut={() => this.closeModal()}>
          <ScrollView 
            style={styles.scrollViewContainer}
            scrollIndicatorInsets={{
              top: headerHeight,
              bottom: TABBAR_HEIGHT,
            }}>
            <View style={[styles.cardContainer, {
              paddingTop: headerHeight
            }]}>
              <View style={{width: '100%'}}>
                <Text style={styles.searchResultText}>{
                  this.props.apiReady ? 'SHOWING "RESULTS"' : 'LOADING...'
                }</Text>
              </View>
              {
                api.media.map(({img_url, caption}, index) =>
                  <SignCard
                    key={index}
                    file={img_url}
                    title={caption}
                    openModal={(...args) => this.openModal(...args)}
                    closeModal={() => this.closeModal()}/>
                )
              }
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        <BlurView intensity={100} tint='light' style={styles.header} onLayout={(event) => {
          let { height } = event.nativeEvent.layout
          this.setHeaderHeight(height)
        }}>
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
                      textStyle={{marginRight: 4}}
                      buttonStyle={styles.navbarIcon}
                      icon={{name: 'list', color: filter.display === 'list' ? 'black' : 'rgba(0, 0, 0, 0.2)', style: {marginRight: 0}}}
                      onPress={() => this.changeFilter('list', null)}
                      large={true}/>
              <Button containerViewStyle={styles.btnContainerView}
                      buttonStyle={styles.navbarIcon}
                      icon={{name: 'map', color: filter.display === 'map' ? 'black' : 'rgba(0, 0, 0, 0.2)', style: {marginRight: 0}}}
                      onPress={() => this.changeFilter('map', null)}
                      large={true}/>
            </View>
            <View style={styles.navbarBtns}>
              <NavButton title="AREA" selected={filter.type === 'area'} onPress={() => this.changeFilter(null, 'area')} />
              <NavButton title="PROPERTY" selected={filter.type === 'property'} onPress={() => this.changeFilter(null, 'property')} />
              <NavButton title="KIND" selected={filter.type === 'kind'} onPress={() => this.changeFilter(null, 'kind')} />
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.filters}>
              {
                (() => {
                  switch(filter.type) {
                    case 'area':
                      return ['All', 'Shanghai', 'Hongkong', 'Taipei', 'Shenzhen']
                        .map((key, index) => <NavButton key={index} selected={filter.tag === key} onPress={() => this.changeFilter(null, null, key)} secondary={true} title={key}/>)
                    case 'property':
                      return ['All', "Danger warning", "Priority", "Prohibitory or restrictive", "Mandatory", "Information, facilities, or service", "Direction, position, or indication"]
                        .map((key, index) => <NavButton key={index} selected={filter.tag === key} onPress={() => this.changeFilter(null, null, key)} secondary={true} title={key}/>)
                    case 'kind':
                      return ['All', "Metro", "Road", "Facility", "Other"]
                        .map((key, index) => <NavButton key={index} selected={filter.tag === key} onPress={() => this.changeFilter(null, null, key)} secondary={true} title={key}/>)
                  }
                })()
              }
            </View>
          </ScrollView>
        </BlurView>

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
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '100%',
    top: 0,
    left: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    zIndex: 1,
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
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -5,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: PIXEL,
    borderColor: 'rgba(0, 0, 0, 0.25)',
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
    position: 'relative',
    display: 'flex',
    width: '100%',
    padding: CARD_MARGIN / 2,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingBottom: TABBAR_HEIGHT,
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
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
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
    shadowOffset: { width: 0, height: 20 },
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 40,
  },
  popupImage: {
    width: SCREEN_WIDTH - CARD_MARGIN * 6,
    height: SCREEN_WIDTH - CARD_MARGIN * 6,
    borderRadius: CARD_BORDER_RADIUS,
    // borderTopLeftRadius: CARD_BORDER_RADIUS,
    // borderTopRightRadius: CARD_BORDER_RADIUS,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    // bottom: 0,
    left: 0,
  },
})
