
import { createStackNavigator } from "@react-navigation/stack";
import { BuscarTrago } from "../ScreenCapture/BuscarTrago"; // Asegúrate de importar tus componentes correctamente
import { CardTrago } from "../ScreenCapture/CardTrago";   // Asegúrate de importar tus componentes correctamente
import { StyleSheet } from "react-native";
const Stack = createStackNavigator();

export default function BuscarTragoRouter() {
  return (

      <Stack.Navigator initialRouteName="BuscarTrago">
        <Stack.Screen name="BuscarTrago" component={BuscarTrago}  options={{headerShown:false}}/>
        <Stack.Screen name="CardTrago" component={CardTrago} options={{headerShown:false}}/>
      </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
    flex: 1,
})

