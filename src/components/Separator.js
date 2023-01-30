import { View, StyleSheet } from 'react-native'
import React from 'react'

const Separator = () => {
  return (
    <View style={styles.itemSeparator} />
  )
}

export default Separator
const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 2,
    backgroundColor: 'lightgray',
    width: "85%",
    marginLeft: "7%",
  }
})
