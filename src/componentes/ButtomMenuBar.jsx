import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../ScreenCapture/Home";
import { CartShopping } from "../ScreenCapture/CartShopping";
import BuscarTragoRouter from "./Router";

const Tab = createBottomTabNavigator();


export const ButtomMenuBar = () => {
//  const navigation = useNavigation();
  return (
    <NavigationContainer>
      <Tab.Navigator
        //   tabBar={() =>(<VisualMenuBar></VisualMenuBar>)}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#212F3C",
            borderRadius: 50,
            borderTopWidth: 0,
            paddingHorizontal: 20,
            marginVertical: 10,
            height: 80,
            left: 20,
            right: 20,
          },
          
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{ tabBarShowLabel:false,
            tabBarIcon: ({focused}) => {
              return (
               
                  <Icon name="home" size={50} color="#2980B9" style={{color: focused ? '#2980B9' : '#797D7F'}}></Icon>
               
              );
            },
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={BuscarTragoRouter}
          options={{tabBarShowLabel:false ,tabBarIcon:({focused})=>{
            return(
             
                <Icon name="magnify" size={50} color="#2980B9" style={{color: focused ? '#2980B9' : '#797D7F'}}></Icon>
          
            )
          } }}
        />
        <Tab.Screen
          name="Carrito"
          component={CartShopping}
          options={{tabBarShowLabel:false , tabBarIcon:({focused})=>{
            return(
            
                <Icon name="cart" size={50} color='#2980B9' style={{color: focused ? '#2980B9' : '#797D7F'}}></Icon>
           
            )
          }}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212F3C",
    paddingVertical: 6,
    width: "90%",
    justifyContent: "center", // Centro verticalmente
    alignItems: "center", // Centro horizontalmente
    // borderTopRightRadius: 15,
    //  borderTopLeftRadius: 15,
    flexDirection: "row",
    borderRadius: 50,
  },
});
