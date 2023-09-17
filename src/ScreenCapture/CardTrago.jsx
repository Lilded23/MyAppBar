import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { busquedaApiId } from "../Connection";

export const CardTrago = ({ route }) => {
  const [trago, setTrago] = useState([]);
  const { tragoId } = route.params;
  useEffect(() => {
    const cargarTragos = async (tragoId) => {
      try {
        const date = await busquedaApiId(tragoId);
        console.log("URL de la imagen:", date.drinks[0].strDrinkThumb);
        setTrago(date.drinks[0]);
      } catch (error) {
        console.log("Error al cargar la tarjeta de trago");
      }
    };
    cargarTragos(tragoId);
  }, [tragoId]);

  const renderIngredients = () => {
    const ingredientes = [];
    for (i = 1; i <= 15; i++) {
      const ingredienteKey = `strIngredient${i}`;
      const medidasKey = `strMeasure${i}`;
      const ingredient = trago[ingredienteKey];
      const medidas = trago[medidasKey];
      if (ingredient && medidas) {
        ingredientes.push(
          <Text key={i} style={styles.instruc}>
            - {medidas} {ingredient}
          </Text>
        );
      }
    }
    return ingredientes;
  };

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <Image source={{ uri: trago.strDrinkThumb }} style={styles.image}></Image>
      <Text style={styles.titulo}>{trago.strDrink}</Text>
      <Text style={styles.instruc}>{trago.strInstructions}</Text>
      {renderIngredients()}
      <TouchableOpacity>
        <View style={styles.buttonAdd}>
          <Text style={styles.buttonText}>Guardar</Text>
        </View>
      </TouchableOpacity>  
    </View >
    <View style={{ height: 0}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#34495E",
    alignItems: "center",
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,

  },
  titulo: {
    paddingTop:10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#ECF0F1",
  },
  instruc: {
    paddingVertical: 10,
    fontSize: 15,
    color: "#ECF0F1",
  },

  buttonAdd:{
   color:'#000000',
   backgroundColor:'#00897B',
   paddingHorizontal:30,
   paddingVertical:10,
   marginTop:10,
   borderRadius:100,
   marginBottom:0 
  },
  buttonText:{
    color:'white',
    fontSize: 20, 
  }
});
