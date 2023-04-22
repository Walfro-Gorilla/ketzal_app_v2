import { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// importamos nanoid
import { nanoid } from 'nanoid'

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    // Obtenemos la fecha actual corta
    const fecha = new Date();
    const fechaCorta = fecha.toLocaleDateString();





    // UPLOAD files function 
    const uploadLogo = async (file) => {
        const storageRef = ref(storage, nanoid(6))
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        return url
    }



    // CREATE function data USERS
    const addDataUser = async (email, password) => {
        try {
            setLoading(prev => ({ ...prev, addDataUser: true }));
            const newDoc = {
                uid: auth.currentUser.uid,
                nanoid: nanoid(6),
                dateCreated: fechaCorta,
                firstName: '',
                lastName: '',
                email: email,
                password: password,
                cell: '',
                lastLogin: fechaCorta,
                userRol: 'ADMIN',
                status: 'ACTIVE',
                rate: '',
                photoURL: '',
            }

            const docRef = doc(db, "Users", newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addDataUser: false }));
        }
    }



    // CREATE function data a Suppliers
    const addData = async (
        nombreEmpresa, address, email, 
        telephone, typeSupplier, currentPosition, 
        status, rate, logoURL,
    ) => {
        try {
            setLoading(prev => ({ ...prev, addData: true }));
            const newDoc = {
                pid: nanoid(9),
                dateCreated: fechaCorta,
                enable: true,
                nanoid: nanoid(6),
                idUser: auth.currentUser.uid,
                lastLogin: fechaCorta,


                name: nombreEmpresa,
                address: address,
                email: email,
                telephone: telephone,
                typeSupplier: typeSupplier,
                status: status,
                rate : rate,
                logoURL: logoURL,
                currentPosition: currentPosition,
            }

            const docRef = doc(db, "Suppliers", newDoc.nanoid)
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
            const dataRef = collection(db, "Suppliers")
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
    // UPDATE function data to clcSuppliers
    const updateData = async (nanoid, newNombre, email, address, telephone,typeSupplier,status,rate,logoURL) => {
        try {
            setLoading((prev) => ({ ...prev, updateData: true }))
            const docRef = doc(db, 'Suppliers', nanoid);
            await updateDoc(docRef, { name: newNombre, email: email, address: address, telephone: telephone, typeSupplier: typeSupplier, status: status, rate: rate, logoURL: logoURL })

            setData(data.map(item => item.nanoid === nanoid ? ({ ...item, name: newNombre, email: email, address: address, telephone: telephone, typeSupplier: typeSupplier, status: status, rate: rate, logoURL: logoURL }) : item))

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }))
        }
    }
    // DELETE function data to clcSuppliers
    const deleteData = async (nanoid) => {
        try {
            setLoading((prev) => ({ ...prev, [nanoid]: true }));
            const docRef = doc(db, 'Suppliers', nanoid);
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
        updateData,
        addDataUser,
        uploadLogo
    };
};