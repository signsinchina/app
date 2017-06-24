/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { StyleSheet, View, Animated, Alert } from 'react-native'
import { Tabs, Tab } from 'react-native-elements'

import { BOARD_MARGIN, BOARD_BORDER_RADIUS, TABBAR_HEIGHT, SCREEN_WIDTH } from '../values'

import CaptureBoard from './CaptureBoard'
import IndexBoard from './IndexBoard'
import GameBoard from './GameBoard'

export default class MainBoard extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 1,
      tabIndicatorAnim: new Animated.Value((SCREEN_WIDTH - BOARD_MARGIN * 2) / 2)
    }
  }
  changeTab (selectedTab) {
    this.setState({selectedTab})
    Animated.spring(
      this.state.tabIndicatorAnim, {
        toValue: (SCREEN_WIDTH - BOARD_MARGIN * 2) * (selectedTab / 3 + 1 / 6),
      }
    ).start()
  }
  render() {
    const { selectedTab, tabIndicatorAnim } = this.state

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.selectedIndicator, { left: tabIndicatorAnim }]}/>
        <Tabs sceneStyle={styles.scene} tabBarStyle={styles.tabbar}>
          <Tab
            titleStyle={styles.tab}
            selectedTitleStyle={styles.tabSelected}
            selected={selectedTab === 0}
            renderSelectedIcon={() => null}
            title='CAPTURE'
            onPress={() => this.changeTab(0)}>
            <CaptureBoard/>
          </Tab>
          <Tab
            titleStyle={styles.tab}
            selectedTitleStyle={styles.tabSelected}
            selected={selectedTab === 1}
            renderSelectedIcon={() => null}
            title='INDEX'
            onPress={() => this.changeTab(1)}>
            <IndexBoard/>
          </Tab>
          <Tab
            titleStyle={styles.tab}
            selectedTitleStyle={styles.tabSelected}
            selected={selectedTab === 2}
            renderSelectedIcon={() => null}
            title='GAMES'
            onPress={() => this.changeTab(2)}>
            <GameBoard/>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: BOARD_MARGIN + 12,
    right: BOARD_MARGIN,
    bottom: BOARD_MARGIN,
    left: BOARD_MARGIN,
  },
  scene: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  tabbar: {
    height: TABBAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
