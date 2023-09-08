import axios from "axios";

export const busquedaApi = async(name) =>{
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        console.log("Conexion a la base de datos exitosa")    
        return response.data

    } catch (error) {
        console.error("Error al conectar a la base de datos" , error)
    }
}

export const busquedaApiId = async(name) =>{
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${name}`)
        console.log("Conexion a la base de datos exitosa")    
        return response.data

    } catch (error) {
        console.error("Error al conectar a la base de datos" , error)
    }
}
