import React from 'react'
import { View , Text,StyleSheet } from 'react-native'

export const CartShopping = () => {
  return (
    <View style={styles.container}>
        <Text>
            Card Shopping
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: "flex-start",
      paddingHorizontal: 5,
      backgroundColor:'#34495E'
    },
})