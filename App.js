import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View , Platform} from "react-native";
import { ButtomMenuBar } from "./src/componentes/ButtomMenuBar";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
          <SafeAreaView style={styles.container}>
      <View style={styles.contetConteiner}>
        <View style={[styles.textContairner ,{paddingVertical:Platform.OS !=='os'? 35:0}]} >
          <Text style={styles.text}>𝐌𝐲 𝐀𝐩𝐩 𝐁𝐚𝐫</Text>
        </View>
      </View>
      <ButtomMenuBar style={styles.ButtomMenuBarStyle}></ButtomMenuBar>
      <StatusBar style="light" />
    </SafeAreaView>

    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "", //pendiente de cargar font

    color: "#FFFFFF",
  },
  textContairner: {
    backgroundColor: "#212F3C",
    paddingTop:35,
    paddingBottom:10,
    width: "100%",
    justifyContent: "center", // Centro verticalmente
    alignItems: "center", // Centro horizontalmente
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
  },
  ButtomMenuBarStyle:{
    backgroundColor:'transparent'
  }
});
