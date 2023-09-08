import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { busquedaApi } from "../Connection";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



export const BuscarTrago = () => {
  const navigator = useNavigation();

  //Guardar valor ingresado
  const [searchText, setSearchText] = useState("");

  //Guardar resultaos de la busqueda en la APi
  const [result, setResult] = useState([]);

  //Conexion a la api para Buscar
  const tragos = async () => {
    try {
      console.log(searchText);
      const date = await busquedaApi(searchText.toString());
      //console.log(date)
      setResult(date.drinks);
      //console.log(result)
    } catch (error) {
      console.error("Error al buscar el producto");
    }
  };
  //Cargar datos de la api en el FlatList
  useEffect(() => {
    tragos();
    console.log("Efecto useEffect ejecutado");
    console.log("Valor actual de result:");
  }, [searchText]);

  //Codigo que se insertara para cada item recibido
  const CargarImagen = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
          <Text style={styles.title}>{item.strDrink}</Text>
          <TouchableOpacity style={styles.containerHeard}>
            <AntDesign
              name="hearto"
              size={20}
              color="black"
              style={styles.heartSelect}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  //Navegar a la pantalla de CardTrago
  const handleItemPress = (item) => {
    navigator.navigate("CardTrago", { tragoId: item.idDrink });
  };

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
      ></TextInput>
      {result ? (
        result.length === 0 ? (
          <Text>No se encontraron resultados.</Text>
        ) : (
          <FlatList
            data={result}
            keyExtractor={(item) => item.idDrink.toString()}
            renderItem={CargarImagen}
          />
        )
      ) : (
        <Text>Cargando resultados...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    backgroundColor: "#34495E",
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 0,
    marginBottom: 8,
    paddingHorizontal: 8,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  buttonBuscar: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1A237E",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  buttonBuscarText: {
    color: "#FAFAFA",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius:50
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  containerHeard: {
    marginLeft: "auto",
  },
  heartSelect: {},
});
