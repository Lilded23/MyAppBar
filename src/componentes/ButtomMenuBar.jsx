import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../ScreenCapture/Home";
import { CartShopping } from "../ScreenCapture/CartShopping";
import BuscarTragoRouter from "./Router";

const Tab = createBottomTabNavigator();
//Visual de la NavBar
function VisualMenuBar() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Inicio')}>
        <Icon
          style={[styles.inconMyApp]}
          name="home"
          size={50}
          color="#2980B9"
        ></Icon>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Buscar')}>
        <Icon
          style={[styles.inconMyApp]}
          name="magnify"
          size={50}
          color="#2980B9"
        ></Icon>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Carrito')}>
        <Icon
          style={[styles.inconMyApp]}
          name="cart"
          size={50}
          color="#2980B9"
        ></Icon>
      </TouchableOpacity>
    </View>
  );
}

export const ButtomMenuBar = () => {
  return (
    <NavigationContainer>
      {/*Agregarmos el CreateButtomNavigator y le agregamos el estilo ya realizado*/}
      <Tab.Navigator
      tabBar={({state,des,navigation}) =>(<VisualMenuBar></VisualMenuBar>)}
      screenOptions={{
       headerShown:false
       
      }}
      >
        <Tab.Screen name="Inicio" component={Home} options={{tabBarLabel:""}} />
        <Tab.Screen name="Buscar" component={BuscarTragoRouter}  options={{tabBarLabel:""}}/>
        <Tab.Screen name="Carrito" component={CartShopping} options={{tabBarLabel:""}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212F3C",
    paddingVertical: 6,
    width: "100%",
    justifyContent: "center", // Centro verticalmente
    alignItems: "center", // Centro horizontalmente
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "row",
  },

  inconMyApp: {
    marginHorizontal: 30,
  },
});
