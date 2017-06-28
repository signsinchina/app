/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Tabs, Tab } from 'react-native-elements'
import { BlurView } from 'expo'

import { BOARD_MARGIN, BOARD_BORDER_RADIUS, BOARD_WIDTH, TABBAR_HEIGHT, SCREEN_HEIGHT } from '../values'

import CaptureBoard from './CaptureBoard'
import IndexBoard from './IndexBoard'
import GameBoard from './GameBoard'

export default class MainBoard extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 1,
      tabIndicatorAnim: new Animated.Value(BOARD_WIDTH / 2),
      tabAnim: new Animated.Value(-BOARD_WIDTH - BOARD_MARGIN * 2),
    }
  }
  changeTab (selectedTab) {
    this.setState({selectedTab})
    Animated.spring(
      this.state.tabIndicatorAnim, {
        toValue: BOARD_WIDTH * (selectedTab / 3 + 1 / 6),
        tension: 30,
        friction: 10,
      }
    ).start()
    Animated.spring(
      this.state.tabAnim, {
        toValue: -(BOARD_WIDTH + BOARD_MARGIN * 2)  * selectedTab,
        tension: 30,
        friction: 10,
      }
    ).start()
    this.props.onModeChange && this.props.onModeChange(['capture', 'index', 'games'][selectedTab])
  }
  render() {
    const { selectedTab, tabIndicatorAnim, tabAnim } = this.state
    const { api, apiReady } = this.props

    return (
      <View style={styles.container}>
        <View style={[styles.tabsView]}>
          <Animated.View style={[styles.tabView, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            left: tabAnim,
          }]}>
            <CaptureBoard api={api}/>
          </Animated.View>
          <Animated.View style={[styles.tabView, {
            marginLeft: BOARD_WIDTH + BOARD_MARGIN * 2,
            left: tabAnim,
          }]}>
            <IndexBoard api={api} apiReady={apiReady}/>
          </Animated.View>
          <Animated.View style={[styles.tabView, {
            marginLeft: (BOARD_WIDTH + BOARD_MARGIN * 2) * 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            left: tabAnim,
          }]}>
            <GameBoard api={api}/>
          </Animated.View>
        </View>
        <Animated.View style={[styles.selectedIndicator, {left: tabIndicatorAnim}]}/>
        <View style={styles.blurViewContainer}>
          <BlurView intensity={100} tint='light' style={styles.sceneContainer}>
            <Tabs sceneStyle={[styles.scene]} tabBarStyle={styles.tabbar}>
              <Tab
                titleStyle={styles.tab}
                selectedTitleStyle={styles.tabSelected}
                selected={selectedTab === 0}
                renderSelectedIcon={() => null}
                title={'CAPTURE'}
                onPress={() => this.changeTab(0)}>
                <View/>
              </Tab>
              <Tab
                titleStyle={styles.tab}
                selectedTitleStyle={styles.tabSelected}
                selected={selectedTab === 1}
                renderSelectedIcon={() => null}
                title='INDEX'
                onPress={() => this.changeTab(1)}>
                <View/>
              </Tab>
              <Tab
                titleStyle={styles.tab}
                selectedTitleStyle={styles.tabSelected}
                selected={selectedTab === 2}
                renderSelectedIcon={() => null}
                title='GAMES'
                onPress={() => this.changeTab(2)}>
                <View/>
              </Tab>
            </Tabs>
          </BlurView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: BOARD_MARGIN + 12,
    right: BOARD_MARGIN,
    bottom: BOARD_MARGIN,
    left: BOARD_MARGIN,
    borderBottomLeftRadius: BOARD_BORDER_RADIUS,
    borderBottomRightRadius: BOARD_BORDER_RADIUS,
    // overflow: 'hidden',
  },
  tabsView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: BOARD_WIDTH,
    borderRadius: BOARD_BORDER_RADIUS,
    // overflow: 'hidden',
  },
  tabView: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: BOARD_WIDTH,
    height: SCREEN_HEIGHT - BOARD_MARGIN * 2 - 12, // - TABBAR_HEIGHT,
    borderRadius: BOARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  sceneContainer: {
    position: 'absolute',
    height: TABBAR_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
  },
  scene: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  blurViewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TABBAR_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: BOARD_BORDER_RADIUS,
    // borderBottomLeftRadius: BOARD_BORDER_RADIUS,
    // borderBottomRightRadius: BOARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  blurView: {
    position: 'absolute',
    height: TABBAR_HEIGHT,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tabbar: {
    height: TABBAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderBottomLeftRadius: BOARD_BORDER_RADIUS,
    borderBottomRightRadius: BOARD_BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tab: {
    height: TABBAR_HEIGHT,
    lineHeight: TABBAR_HEIGHT,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'din-alternate-bold',
    fontSize: 12,
  },
  tabSelected: {
    color: 'black',
  },
  selectedIndicator: {
    position: 'absolute',
    height: 5,
    width: 60,
    marginLeft: -30,
    bottom: TABBAR_HEIGHT - 5,
    backgroundColor: 'black',
    zIndex: 1,
  }
})
