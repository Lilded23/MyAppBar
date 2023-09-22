import { collection, doc, getDocs, setDoc, deleteDoc,getDoc,updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase from "../dababase/firebase.js";
import { addDoc } from "firebase/firestore";


export const cargarFavorito = async () => {
  const tragosRef = collection(firebase.db, 'tragos');
  const queryTragos = await getDocs(tragosRef);

  const tragosCargados = [];
  queryTragos.forEach((doc) => {
    tragosCargados.push({ id: doc.id, ...doc.data() });
  });

  return tragosCargados;
};

export const deleteFavorite = async (id) => {
  const db = getFirestore();
  const tragoRef = doc(db, "tragos", id);

  await deleteDoc(tragoRef);
  await cargarFavorito();
};

export const addNewFavorite = async (item) => {
  try {
    const { idDrink, strDrink } = item;
    const docRef = doc(firebase.db, "tragos", idDrink);
    await setDoc(docRef, {
      name: strDrink,
      idTrago: idDrink,    
    });
    await cargarFavorito();
  } catch (error) {
    console.error("Error al guardar el archivo ", error);
  }
};
  export const addLicor = async (item)=> {
    try{
      const collectionRef = collection(firebase.db, "Licor"); // Aquí solo pasamos la referencia al documento
      await addDoc(collectionRef, item); // Pasamos los datos directamente como segundo argumento
        
    }catch(e){
      console.error(e)
    } 
};

export const cargarLicor = async () => {
  const licorRef = collection(firebase.db, 'Licor');
  const queryLicor = await getDocs(licorRef);

  const licorCargados = [];
  queryLicor.forEach((doc) => {
    licorCargados.push({ id: doc.id, ...doc.data() });
  });

  return licorCargados;
};

export const eliminarLicor = async (ubicacion, nombreIngrediente) => {
  try {
    const db = getFirestore();
    const licorRef = doc(db, "Licor", ubicacion);

    const licorDoc = await getDoc(licorRef);

    if (licorDoc.exists()) {
      const data = licorDoc.data();
      console.log("Data ", data);
      console.log("nombreIngrediente ", nombreIngrediente);

      let ingredienteEliminado = false;

      for (let i = 1; i <= 15; i++) {
        if (data[`ingrediente${i}`] === nombreIngrediente) {
          // Elimina la propiedad con el nombre correcto
          delete data[`ingrediente${i}`];
          console.log("Data después de la eliminación:", data);
          console.log("Licor Red " ,licorRef)
          await setDoc(licorRef , data)
          console.log(`Ingrediente "${nombreIngrediente}" eliminado del documento en la ubicación ${ubicacion}.`);
          ingredienteEliminado = true;
          break; // Sal del bucle una vez que se haya eliminado el ingrediente
        }
      }

      if (!ingredienteEliminado) {
        console.log(`El ingrediente "${nombreIngrediente}" no existe en el documento en la ubicación ${ubicacion}.`);
      }
    } else {
      console.log(`No se encontró el documento en la ubicación ${ubicacion}.`);
    }
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
  }
};


