import React, { useContext } from 'react'
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState, useEffect } from 'react';


// importamos la funcion UPLOADFILE
import { useFirestore } from '../hooks/useFirestore'
import {SupplierContext} from '../context/SupplierProvider';
// import { UserContext } from '../context/UserProvider';



const UploadLogo = (props) => {

    // Declaramos el state de los archivos
    const [cropArea, setCropArea] = useState()
    const [cropHeight, setCropHeight] = useState()
    const [cropWidth, setCropWidth] = useState()

    // Destructuring del useFirestore
    const { uploadLogo } = useFirestore()

  
    // inicializamos el state del contexto de SUPPLIERPROVIDER
    const { logoURL, setLogoURL } = useContext(SupplierContext)



    useEffect(() => {

        // console.log("PROPS: ", props ? props.imgUpload : '')
        // console.log("TYPE: ", props ? props.type : '')
        setLogoURL(props ? props.logoURL : '')


        if (props.type === 'banner') {
            setCropHeight(900)
            setCropWidth(1800)
            // console.log('imagen de BANNER')

        } else if (props.type === 'nosotros') {
            setCropHeight(642)
            setCropWidth(543)
            // setImgUpload(props ? props.imgNosotros : '')
            setCropArea('543/642')
            // console.log('imagen NOSOTROS')

        } else if (props.type === 'covertura') {
            setCropHeight(720)
            setCropWidth(1000)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('100/720')
            // console.log('imagen COVERTURA')

        } else if (props.type === 'logo') {
            setCropHeight(250)
            setCropWidth(250)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('500/500')
            // console.log('imagen COVERTURA')
        }

    }, [])

    const [loading, setLoading] = useState(false)
    // //const [file, setFile] = useState(null)


    // -- // FUNCTION uploadData IMG // -- //
    const uploadData = async (e) => {

        // console.log("file: ", e.name)

        const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png'
        const isLt5m = (e.size / 1024 / 1024) < 5

        if (!isJpgOrPng) { return message.error('Solo puedes subir imagenes JPG o PNG') }
        if (!isLt5m) { return message.error('La imagen que intentas subir, pesa mas de 5MB') }

        try {

            const result = await uploadLogo(e)

            // if (props.type === 'banner') {
            //     await db.collection('clcDataArgio').doc('4Rp3Z1gbgwJWjWLGbqKJ').update({ imgBanner: result })
            // } else if (props.type === 'nosotros') {
            //     await db.collection('clcDataArgio').doc('4Rp3Z1gbgwJWjWLGbqKJ').update({ imgNosotros: result })
            // } else if (props.type === 'covertura') {
            //     await db.collection('clcDataArgio').doc('4Rp3Z1gbgwJWjWLGbqKJ').update({ imgCovertura: result })
            // }
            // message.success("Upload exitoso")

            setLogoURL(result)


            console.log("img logoURL: ", logoURL)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ImgCrop aspect={cropWidth / cropHeight} modalTitle='Ajusta la Imagen' rotationSlider={false} >
            <Upload
                name='banner'
                listType="picture-card"
                className='avatar-uploader'
                showUploadList={false}

                beforeUpload={uploadData}
            // onChange={e => onChangeBanner(e)}
            >
                {props ? <img src={logoURL} alt="Banner" style={{ width: '100%' }} /> : "subir..."}
                {/* {fileList.length < 1 && <p> {imgBanner} </p>} */}
            </Upload>
        </ImgCrop>
    );
};

export default UploadLogo;