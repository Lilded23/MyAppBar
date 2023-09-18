import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { cargarFavorito } from "../../dababase/acciones";
import { useState } from "react";
import { busquedaApiId } from "../Connection";
import { Card, Text } from "react-native-paper";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const navigator = useNavigation();
  const [trago, setTrago] = useState([]);
  const [loading, setLoading] = useState();

  const handleItemPress = (item) => {
    navigator.navigate("CardTrago", { tragoId: item.idDrink });
  };

  const fetchData = async () => {
    try {
      // Obtenemos la lista de tragos favoritos
      const favoritos = await cargarFavorito(true);
      // console.log(favorito)
      // Creamos un arreglo de promesas para obtener detalles de los tragos
      const tragosPromesas = favoritos.map((favorito) => {
        // Llamamos a la función para obtener detalles del trago por su ID
        const ref = busquedaApiId(favorito.idTrago);
        return ref; // Agregamos la promesa al arreglo
      });
      // Esperamos a que todas las promesas se resuelvan
      const tragos = await Promise.all(tragosPromesas);
      // Actualizamos el estado del componente con la lista completa de tragos favoritos
      setTrago(tragos);
      setLoading(false);
    } catch (e) {
      console.error("Error al cargar los datos:", e);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.error("Error al cargar los datos :", e);
    }
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log("refreshing");
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  const cargarTrago = (item) => {
    //console.log("Cargar desde cargoTrago",item)
    const tragoData = item.item.drinks[0];
    return (
      <TouchableOpacity
        key={tragoData.idDrink}
        style={styles.cardFavTrago}
        onPress={() => handleItemPress(tragoData)}
      >
        <Card style={{ backgroundColor: "#212F3C" }}>
          <Card.Title
            title={tragoData.strDrink}
            titleStyle={styles.tituloCard}
          />
          <Card.Cover
            source={{ uri: tragoData.strDrinkThumb }}
            style={styles.imagen}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  return (

      <View style={styles.container}>
        {loading ? (
          <Text>Cargando datos</Text>
        ) : trago.length > 0 ? (
          <FlatList
            data={trago}
            keyExtractor={(item) => item.drinks[0].idDrink}
            renderItem={cargarTrago}
            refreshControl={
              // Cambia RefreshControl a refreshControl
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text>No tiene Tragos Guardados</Text>
        )}
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#34495E",
    flexDirection: "row",
  },
  sinCargarSyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  tituloCard: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  cardFavTrago: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  imagen: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    backgroundColor: "#212F3C",
  },
});
