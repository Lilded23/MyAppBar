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
import { cargarFavorito,deleteFavorite,addNewFavorite } from "../../dababase/acciones";


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
      setResult(date.drinks);
    } catch (error) {
      console.error("Error al buscar el producto");
    }
  };
  //Cargar datos de la api en el FlatList
  useEffect(() => {
    tragos();
  }, [searchText]);

  //cargar Tragos al objeto
  useEffect(() => {
    cargarFavorito().then((favorito) => {
      setFavorite(favorito)
    })
  }, [])



  const [favorite, setFavorite] = useState([])

  //Codigo que se insertara para cada item recibido
  const CargarImagen = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
          <Text style={styles.title}>{item.strDrink}</Text>
          <TouchableOpacity onPress={ async()=>{
              if (favorite.some((favorito) => favorito.id === item.idDrink)) {
                await deleteFavorite(item.idDrink);
              } else {
                await addNewFavorite(item);
              }

              cargarFavorito().then((favorito) =>{
                setFavorite(favorito)
              })
            }
          } style={styles.containerHeard}>
            {favorite.some((favorito) => favorito.id === item.idDrink) ? (
              <AntDesign name="heart" size={24} color="red" />  
                         
            ):(
              <AntDesign name="hearto" size={24} color="black" />
            )}
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
          <Text>Cargando Tragos</Text>
        ) : (
          <FlatList
            data={result}
            keyExtractor={(item) => item.idDrink.toString()}
            renderItem={CargarImagen}

          />
        )
      ) : (
       null
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
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize:20,
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
    paddingLeft:10
  },
  containerHeard: {
    marginLeft: "auto",
    paddingRight:10
  },
});
