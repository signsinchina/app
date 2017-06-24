/**
 * Created by shu on 24/6/2017.
 */
import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

export default class Container extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"
                   hidden={false}/>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
