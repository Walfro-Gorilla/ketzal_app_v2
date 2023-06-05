import { useState } from "react";
import { db, auth, storage } from "../firebase";
import {
    collection, deleteDoc, doc,
    getDocs, query, setDoc,
    updateDoc, where
} from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// importamos nanoid
import { nanoid } from 'nanoid'

export const useFirestore = () => {

    // Inicializamos los STATES a utilizar
    // //   data SUPPLIERS   
    const [data, setData] = useState([])
    // //   dataCLIENTS
    const [dataClients, setDataClients] = useState([])
    // //   data SERVICES
    const [dataServices, setDataServices] = useState([])


    // STATES de info
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
            // seteamos el state de LOADING en true
            setLoading(prev => ({ ...prev, addDataUser: true }));
            // creamos el nuevo objeto para agregar a la BD
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

            // creamos la referencia para el metodo de setDoc de firebase
            const docRef = doc(db, "Users", newDoc.nanoid)
            // funcion asincrona para agregar el nuevo documento en la referencia de la BD
            await setDoc(docRef, newDoc)

            setData([...data, newDoc])

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addDataUser: false }));
        }
    }



    // CREATE function data CLIENTS
    const addDataClient = async (
        firstName,
        lastName,
        email,
        telephone,
        password,
        birthdate,
        status,
        rate,
        photoURL,
        wishList,
        comments,
        type,
    ) => {
        try {
            setLoading(prev => ({ ...prev, addDataClient: true }));
            const newDoc = {
                idUser: auth.currentUser.uid,
                key: nanoid(6),
                dateCreated: fechaCorta,
                status: status,
                lastLogin: fechaCorta,

                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                telephone: telephone,
                birthdate: birthdate,
                rate: rate,
                photoURL: photoURL,
                wishList: wishList,
                comments: comments,
                type: type,
            }
            const docRef = doc(db, "Clients", newDoc.key)
            await setDoc(docRef, newDoc)
            setDataClients([...dataClients, newDoc])
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addDataClient: false }));
        }
    }
    // READ function data de CLIENTS
    const getDataClient = async () => {
        // console.log("Auth: ", auth.currentUser.uid)
        try {
            setLoading(prev => ({ ...prev, getDataClient: true }));
            // creamos la referencia a la colleccion
            const dataRef = collection(db, "Clients")
            // filtramos los resultados dependiendo el USER logeado.
            const q = query(
                dataRef,
                where("idUser", "==", auth.currentUser.uid)
            )
            // Obtenemos la data de firebase
            const querySnapshot = await getDocs(q)
            // mapeamos el array devuelto para setearlo al state 
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setDataClients(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getDataClient: false }));
        }
    }
    // UPDATE function data to CLIENTS
    const updateDataClient = async (
        key,

        firstName, lastName, email,
        telephone, password, birthdate,
        status, rate, photoURL,
        wishList, comments, type,
    ) => {
        try {
            setLoading((prev) => ({ ...prev, updateDataClient: true }))
            const docRef = doc(db, 'Clients', key);
            await updateDoc(docRef, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                telephone: telephone,
                birthdate: birthdate,
                rate: rate,
                photoURL: photoURL,
                wishList: wishList,
                comments: comments,
                type: type,
                status: status,

            })

            setDataClients(dataClients.map(item => item.key === key ? ({
                ...item,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                telephone: telephone,
                birthdate: birthdate,
                rate: rate,
                photoURL: photoURL,
                wishList: wishList,
                comments: comments,
                type: type,
                status: status,
            }) : item))

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateDataClient: false }))
        }
    }
    // DELETE function data to CLIENTS
    const deleteDataClient = async (key) => {
        try {
            // seteamos el state del loading TRUE
            setLoading((prev) => ({ ...prev, [key]: true }));
            // creamos la referencia de donde se almacenara la info y cual
            const docRef = doc(db, 'Clients', key);
            // ejecutamos la funcion 'deleteDoc' conla referencia creada
            await deleteDoc(docRef)
            setDataClients(dataClients.filter(item => item.key !== key))
        } catch (error) {
            alert("ERROR: ", error.message)
            console.log(error)
        } finally {
            // seteamos el loading FALSE
            setLoading((prev) => ({ ...prev, [key]: false }));
        }
    }


    // CREATE function data a SUPPLIERS
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
                rate: rate,
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
    // READ function data de SUPPLIERS
    const getData = async () => {

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
    // UPDATE function data to SUPPLIERS
    const updateData = async (nanoid, newNombre, email, address, telephone, typeSupplier, status, rate, logoURL) => {
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
    // DELETE function data to SUPPLIERS
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


    // --- // CREATE function data SERVICES // --- //
    //---------------------------------------------//
    const addDataServices = async (

        idSupplier, nameSupplier, type,
        name, description, imgList,
        dates, itinerary, options,

        enabled, rate, option,
    ) => {
        try {
            setLoading(prev => ({ ...prev, addDataService: true }));
            const newDoc = {
                idUser: auth.currentUser.uid,
                key: nanoid(6),
                dateCreated: fechaCorta,
                status: "NEW",
                lastLogin: fechaCorta,

                enabled: enabled,
                rate: rate,

                idSupplier: idSupplier,
                nameSupplier: nameSupplier,
                type: type,
                name: name,
                dates: dates,
                description: description,
                imgList: imgList,
                itinerary: itinerary,
                options: options,

                option: option,
            }
            const docRef = doc(db, "Services", newDoc.key)
            await setDoc(docRef, newDoc)
            setDataServices([...dataServices, newDoc])
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addDataService: false }));
        }
    }
    // READ function data de SERVICES
    const getDataService = async () => {
        try {
            setLoading(prev => ({ ...prev, getDataService: true }));
            // creamos la referencia a la colleccion
            const dataRef = collection(db, "Services")
            // filtramos los resultados dependiendo el USER logeado.
            const q = query(
                dataRef,
                where("idUser", "==", auth.currentUser.uid)
            )
            // Obtenemos la data de firebase
            const querySnapshot = await getDocs(q)
            // mapeamos el array devuelto para setearlo al state 
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setDataServices(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getDataService: false }));
        }
    }
    // UPDATE function data to SERVICES
    const updateDataService = async (

        key,

        idSupplier, nameSupplier, type,
        name, description, imgList,
        dates, itinerary, options,

        enabled, rate, option,
    ) => {
        try {
            setLoading((prev) => ({ ...prev, updateDataService: true }))
            const docRef = doc(db, 'Services', key);
            await updateDoc(docRef, {

                enabled: enabled,
                rate: rate,

                idSupplier: idSupplier,
                nameSupplier: nameSupplier,
                type: type,
                name: name,
                dates: dates,
                description: description,
                imgList: imgList,
                itinerary: itinerary,
                options: options,

                option: option,
            })

            setDataServices(dataServices.map(item => item.key === key ? ({
                ...item,
                enabled: enabled,
                rate: rate,

                idSupplier: idSupplier,
                nameSupplier: nameSupplier,
                type: type,
                name: name,
                dates: dates,
                description: description,
                imgList: imgList,
                itinerary: itinerary,
                options: options,

                option: option,
            }) : item))

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateDataService: false }))
        }
    }


    return {
        error,
        loading,
        uploadLogo,

        addDataUser,

        data,
        getData,
        addData,
        updateData,
        deleteData,

        dataClients,
        getDataClient,
        addDataClient,
        updateDataClient,
        deleteDataClient,

        getDataService,
        dataServices,
        addDataServices,
        updateDataService
    };
};