import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase from "../dababase/firebase.js";

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
