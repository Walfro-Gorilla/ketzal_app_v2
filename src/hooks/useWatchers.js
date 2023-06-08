import { db, auth } from "../firebase";

export const watcherSuppliers = async () => {
    try {
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

export function watcherMisProovedores(callback) {



    const unsub = db
        .collection('clcMisProovedores')
        // .where('idUser', '==', auth.currentUser.uid)
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                docs.push({
                    ...data,
                    id: doc.id,
                });
            });
            callback(docs);
        });
    return unsub;
}