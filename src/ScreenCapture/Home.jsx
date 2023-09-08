import React from 'react'
import { View ,Text ,StyleSheet} from 'react-native'

export const Home = () => {

  const sinCargar = () =>{
    return(
      <View>
        
        <Text style={styles.sinCargarSyle}>
        𝘼𝙦𝙪𝙞 𝙑𝙚𝙧𝙖𝙨 𝙏𝙪𝙨 𝙏𝙧𝙖𝙜𝙤𝙨
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <Text>
            {sinCargar()}
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: "center",
      alignItems:'center',

      backgroundColor:'#34495E'
    },
    sinCargarSyle:{
      fontSize:30,
      fontWeight:'bold',
      color:'#FFFFFF'
    },
})