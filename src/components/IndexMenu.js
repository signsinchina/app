/**
 * Created by shu on 24/6/2017.
 */

import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Animated, Easing } from 'react-native'
import { Button, Divider } from 'react-native-elements'

class IndexMenuBtn extends Component {
  render() {
    return (
      <Button
        containerViewStyle={styles.btnContainerView}
        backgroundColor={this.props.selected ? 'black' : 'rgba(0, 0, 0, 0)'}
        color={this.props.selected ? 'white' : 'black'}
        underlayColor="rgba(100, 100, 100, 0.5)"
        buttonStyle={styles.button}
        textStyle={styles.text}
        onPress={this.props.onPress}
        title={this.props.title}/>
    )
  }
}

export default class IndexMenu extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 'all',
      heightAnim: new Animated.Value(0)
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.open !== this.props.open) {
      Animated.spring(
        this.state.heightAnim, {
          toValue: newProps.open ? 55 : 10,
          tension: 35,
          friction: 7,
        }
      ).start()
    }
  }
  changeTab(selectedTab) {
    this.setState({ selectedTab })
  }
  render() {
    const {selectedTab, heightAnim} = this.state
    return (
      <Animated.View style={[styles.container, { height: heightAnim }]}>
        <ScrollView style={styles.scrollViewContainer} horizontal={true}>
          <IndexMenuBtn title="All"
                        selected={selectedTab === 'all'}
                        onPress={() => this.changeTab('all')}/>
          <IndexMenuBtn title="My Collection"
                        selected={selectedTab === 'collection'}
                        onPress={() => this.changeTab('collection')}/>
          <Divider style={styles.divider}/>
          <IndexMenuBtn title="About"
                        selected={selectedTab === 'about'}
                        onPress={() => this.changeTab('about')}/>
          <IndexMenuBtn title="Help"
                        selected={selectedTab === 'help'}
                        onPress={() => this.changeTab('help')}/>
          <IndexMenuBtn title="Preference"
                        selected={selectedTab === 'preference'}
                        onPress={() => this.changeTab('preference')}/>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#ccc',
    width: 1,
    height: 25,
    margin: 5,
  },
  container: {
    width: '100%',
    height: 0,
    paddingTop: 10,
  },
  scrollViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainerView: {
    marginLeft: 0,
    marginRight: 0,
    margin: 5,
    padding: 0,
  },
  button: {
    height: 25,
    borderRadius: 4,
  },
  text: {
    marginRight: 0,
    fontSize: 12,
    fontFamily: 'din-alternate-bold',
  }
})
