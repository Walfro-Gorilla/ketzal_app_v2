import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";

// importamos nanoid
import { nanoid } from 'nanoid'

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})



    // CREATE function data a clcProveedores
    const addData = async (nombreEmpresa, costo, currentPosition) => {
        try {
            setLoading(prev => ({ ...prev, addData: true }));
            const newDoc = {
                enable: true,
                nanoid: nanoid(6),
                idUser: auth.currentUser.uid,
                nombre: nombreEmpresa,
                costo: costo,
                currentPosition: currentPosition,
            }

            const docRef = doc(db, "clcProovedores", newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addData: false }));
        }
    }

    // READ function data de clcProveedores
    const getData = async () => {
        // console.log("Auth: ", auth.currentUser.uid)
        try {
            setLoading(prev => ({ ...prev, getData: true }));
            // creamos la referencia a la colleccion
            const dataRef = collection(db, "clcProovedores")
            // filtramos la data segun parametros
            const q = query(
                dataRef,
                where("idUser", "==", auth.currentUser.uid)
            )
            // Obtenemos la data de firebase
            const querySnapshot = await getDocs(q)
            // mapeamos el array devuelto para setearlo al state 
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getData: false }));
        }
    }

    // UPDATE function data to clcProovedores
    const updateData = async (nanoid, newNombre, newCost) => {
        try {
            setLoading((prev) => ({ ...prev, updateData: true }))
            const docRef = doc(db, 'clcProovedores', nanoid);
            await updateDoc(docRef, { nombre: newNombre, costo: newCost })
            setData(data.map(item => item.nanoid === nanoid ? ({ ...item, nombre: newNombre, costo: newCost }) : item))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }))
        }
    }

    // DELETE function data to clcProovedores
    const deleteData = async (nanoid) => {
        try {
            setLoading((prev) => ({ ...prev, [nanoid]: true }));
            const docRef = doc(db, 'clcProovedores', nanoid);
            await deleteDoc(docRef)
            setData(data.filter(item => item.nanoid !== nanoid))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading((prev) => ({ ...prev, [nanoid]: false }));
        }
    }

    return {
        data,
        error,
        loading,
        getData,
        addData,
        deleteData,
        updateData
    };
};