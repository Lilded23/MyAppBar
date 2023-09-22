import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { cargarLicor } from "../../dababase/acciones";
import { AntDesign } from '@expo/vector-icons';
import { eliminarLicor } from "../../dababase/acciones";

export const CartShopping = () => {
  const [listaTragos, setListaTragos] = useState([])

  const fetchData = async () => {
    try {
      const lista = await cargarLicor(true);
      const licores=[];
      //console.log(lista)
      lista.forEach((objeto) => {
       const licoresID = {
          id:objeto.id,
          ingredientes:[]
        }
        for (i = 1; i <= 15; i++) {
          const ingredienteIndice = `ingrediente${i}`;
          const ingrediente = objeto[ingredienteIndice];
          if (ingrediente) {
            licoresID.ingredientes.push(ingrediente);

            //console.log(ingrediente)
          }
        }
        licores.push(licoresID)
        //console.log(licores)
      });
      setListaTragos(licores)
      console.log(listaTragos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const eliminarLicorHandler = async (licorAEliminar, nombreIngrediente) => {
    try {
      // Obtiene el índice del licor a eliminar en la lista local
      const indexAEliminar = listaTragos.findIndex(item => item.id === licorAEliminar);
  
      if (indexAEliminar !== -1) {
        // Elimina el ingrediente del licor en la lista local
        const nuevaListaTragos = [...listaTragos];
        const licorAEliminarEnLista = nuevaListaTragos[indexAEliminar];
        const nuevoListadoIngredientes = licorAEliminarEnLista.ingredientes.filter(ingred => ingred !== nombreIngrediente);
        licorAEliminarEnLista.ingredientes = nuevoListadoIngredientes;
        setListaTragos(nuevaListaTragos);
  
        // Actualiza el documento en Firebase eliminando el ingrediente
      //  console.log(licorAEliminar)
      //  console.log(nombreIngrediente)
        await eliminarLicor(licorAEliminar, nombreIngrediente);
      } else {
        console.log("El licor a eliminar no se encontró en la lista local.");
      }
    } catch (error) {
      console.error("Error al eliminar el licor:", error);
    }
  };
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.ScrollContainer}>
      <View style={styles.container}>
        {listaTragos.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.textInput}>{item.nombreLicor}</Text>
              {item.ingredientes.map((ingrediente, ingredienteIndex) => (
                <View key={ingredienteIndex} style={styles.containerInput}>
                  <Text style={styles.textInput}>{ingrediente}</Text>
                  <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => eliminarLicorHandler(item.id , ingrediente)}>
                    <AntDesign name="delete" size={25} color="#943126" style={styles.iconDelete} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
  
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    backgroundColor: "#34495E",
    paddingTop:10,
    paddingBottom:700
  },
  containerInput:{
    flex:1,
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#1B2631',
    borderRadius:50,
    marginBottom:10,
    justifyContent:'space-between',
    paddingHorizontal:20

  },
  textInput:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    alignItems:'center'
  },
  iconDelete:{
    marginRight:2
  },
  ScrollContainer:{
    backgroundColor: "#34495E",
    flex:0
  }
});
