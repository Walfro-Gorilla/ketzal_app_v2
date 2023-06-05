import React, { useContext } from 'react'
import { Button, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState, useEffect } from 'react';


// importamos la funcion UPLOADFILE
import { useFirestore } from '../hooks/useFirestore'
import { SupplierContext } from '../context/SupplierProvider';
import { UploadOutlined } from '@ant-design/icons';
import { ServiceContext } from '../context/ServicesProvider';



const UploadLogo = (props) => {

    // Declaramos el state de los archivos
    const [cropHeight, setCropHeight] = useState()
    const [cropWidth, setCropWidth] = useState()

    // Destructuring del useFirestore
    const { uploadLogo } = useFirestore()


    // inicializamos el state del contexto de SUPPLIERPROVIDER
    const { logoURL, setLogoURL } = useContext(SupplierContext)
    const { imgLista, setImgList } = useContext(ServiceContext)



    useEffect(() => {

        setLogoURL(props ? props.logoURL : '')


        if (props.type === 'logo') {
            setCropHeight(250)
            setCropWidth(250)
        } else if (props.type === 'cover') {
            setCropHeight(213)
            setCropWidth(385)
        }

    }, [])

    const [loading, setLoading] = useState(false)


    // -- // FUNCTION uploadData IMG // -- //
    const uploadData = async (e) => {

        const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png'
        const isLt5m = (e.size / 1024 / 1024) < 5

        if (!isJpgOrPng) { return message.error('Solo puedes subir imagenes JPG o PNG') }
        if (!isLt5m) { return message.error('La imagen que intentas subir, pesa mas de 5MB') }

        try {

            const result = await uploadLogo(e)
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
            >
                {logoURL ?
                    <img src={logoURL} alt="Logo" style={{ width: '100%' }} />
                    :
                    <UploadOutlined />
                }
            </Upload>
        </ImgCrop>
    );
};

export default UploadLogo;